import PostCourse from "@/models/postProject";
import connectDB from "@/config/database";
import { NextResponse } from 'next/server';
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    let day = searchParams.get('day');
    await connectDB();
    const courses = await PostCourse.find({ 'Detail.Day': day }, { 'Detail': 1, ID: 1 }).lean();
    const filteredCourse = courses.flatMap(course => {
      const matchingDetails = course.Detail.filter(detail => detail.Day === day);
      return matchingDetails.map(detail => ({
        ID: course.ID,
        Time: detail.Time,
        Room: detail.Room,
        Teacher: detail.Teacher,
        Lesson: detail.ID,
        Topic: detail.Topic,
        TeachingAs: detail.TeachingAs,
      }));
    });

    return NextResponse.json(filteredCourse, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store'
      }
    });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
