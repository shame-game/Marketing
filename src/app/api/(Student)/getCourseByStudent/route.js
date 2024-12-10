import { NextResponse } from 'next/server';
import PostCourse from '@/models/postCourse';
import PostModel from '@/models/postModels';
import connectDB from '@/config/database';
import fetch from 'node-fetch'; // Ensure node-fetch is installed

export async function POST(request) {
  try {
    const { Student } = await request.json();
    await connectDB();

    // Fetch the student data
    let student = await PostModel.findOne({ ID: Student }, { Course: 1, Name: 1 });
    let course = [];

    // Fetch courses associated with the student
    for (const t of Object.keys(student.Course)) {
      let c = await PostCourse.findOne(
        { ID: t },
        { Student: { $elemMatch: { ID: Student } }, _id: 0 }
      );

      if (c && c.Student && c.Student.length > 0) {
        let g = { ...c.Student[0], Course: t };
        course.push(g);
      }
    }

    // Loop through each course to generate summarized comments
    for (let i = 0; i < course.length; i++) {
      const learn = course[i].Learn; // The "Learn" object
      let allComments = [];

      // Collect all comments from "Cmt" arrays in each session
      for (const sessionKey of Object.keys(learn)) {
        const session = learn[sessionKey];
        if (session.Cmt && Array.isArray(session.Cmt)) {
          allComments = allComments.concat(session.Cmt);
        }
      }

      // Prepare the prompt for OpenAI
      const prompt = `Bạn là giáo viên và cần viết nhận xét tổng kết cho học sinh ${student.Name} trong khóa học ${course[i].Course} khoảng 300 từ, đây là nội dung cá nhân học sinh không phải gửi cho phụ huynh và trong văn bản không cần chủ ngữ tôi, chỉ cần nhắm vào học sinh và gọi là em. Hãy xem xét thật kĩ và đưa ra nội dung tổng kết dựa trên các nhận xét sau từ các buổi học:

${allComments.map((cmt) => `- ${cmt}`).join('\n')}

Nhận xét tổng kết:`;

      // Call the OpenAI API to get the summarized comment
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.openAIkey}`, // Ensure this is set
        },
        body: JSON.stringify({
          model: 'gpt-4', // or 'gpt-4' if available
          messages: [
            { role: 'user', content: prompt },
          ],
          max_tokens: 400,
        }),
      });

      // Check if the response is OK
      if (!response.ok) {
        const errorResponse = await response.json();
        console.error('OpenAI API error:', errorResponse);
        return NextResponse.json({ error: errorResponse.error.message }, { status: response.status });
      }

      const data = await response.json();
      const summarisedComment = data.choices[0].message.content.trim();

      // Add the summarized comment to the course object
      course[i].SummaryComment = summarisedComment;
    }

    return NextResponse.json({ air: 2, data: course }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Lỗi khi lấy dữ liệu' }, { status: 500 });
  }
}
