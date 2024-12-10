import PostCourse from "@/models/postCourse";
import PostModel from "@/models/postModels";
import connectDB from "@/config/database";
import { authenticate } from '@/utils/authenticate';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { user, body } = await authenticate(request);
    const coursePermission = user.role.Permission.Course.update.confirm;

    const { id, student } = body

    let data;
    let message = 'Lấy dữ liệu thành công';
    let status = 200;
    await connectDB();

    const course = await PostCourse.findOneAndUpdate(
      { ID: id },
      { $set: { Status: true } },
      { new: true }
    )

    switch (coursePermission.level) {
      case 'All':
        for (let i = 0; i < student.length; i++) {
          const studentId = student[i];
          const students = await PostModel.findOne({ ID: studentId });
          if (!students) continue
          const non_comment = getCommentsByStudentID(students.ID, course)
          console.log(non_comment);

          let comment = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${process.env.openAIkey}`,
            },
            body: JSON.stringify({
              model: 'gpt-4',
              messages: [
                {
                  role: "user",
                  content: `Bạn là một giáo viên. Nhiệm vụ của bạn là viết một nhận xét tổng hợp về học sinh dựa trên các ý kiến được cung cấp. Không cần xưng hô, chỉ cần viết nhận xét súc tích và có cấu trúc. Hãy viết một nhận xét tổng hợp khoảng 400 chữ cho học sinh dựa trên những ý kiến sau: ${non_comment}`
                }
              ],
              max_tokens: 400,
            }),
          });
          comment = await comment.json()
          comment = comment.choices[0].message.content
          const updatedCourse = {
            ...(students.Course || {}),
            [id]: {
              StatusLearn: true,
              StatusPay: students.Course[id].StatusPay,
              Comment: comment
            },
          };

          await PostModel.findOneAndUpdate(
            { ID: studentId },
            { Course: updatedCourse },
            { new: true }
          );
        }
        break;

      case 'Block':
        message = 'Bạn không có quyền truy cập dữ liệu này!';
        data = null;
        status = 403;
        break;

      default:
        message = 'Invalid permission level';
        data = null;
        status = 400;
        break;
    }

    return NextResponse.json(
      { air: status === 200 ? 2 : 1, mes: message, data },
      { status }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Server Error" }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}


function getCommentsByStudentID(studentID, course) {
  const student = course.Student.find((s) => s.ID === studentID);
  if (!student || !student.Learn) {
    return { error: "No learning data found for this student" };
  }

  const comments = [];
  Object.values(student.Learn).forEach((lesson) => {
    if (lesson.Cmt && Array.isArray(lesson.Cmt)) {
      comments.push(...lesson.Cmt);
    }
  });

  return comments;
};