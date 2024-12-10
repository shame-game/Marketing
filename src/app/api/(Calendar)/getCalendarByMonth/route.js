import PostCourse from "@/models/postProject";
import PostUser from "@/models/postUser";
import connectDB from "@/config/database";
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
export const preferredRegion = process.env.area
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const month = searchParams.get('month');
    const authorizationHeader = request.headers.get('Authorization');
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Token is missing or invalid' }, { status: 401 });
    }
    const token = authorizationHeader.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!month) return NextResponse.json({ error: 'Month parameter is required' }, { status: 400 })
    await connectDB();
    const user = await PostUser.findById(decodedToken.userId, 'Name');
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })
    const courses = await PostCourse.find({ 'Detail.Day': { $regex: new RegExp(`/${month}/`) } }, { 'Detail': 1, ID: 1 });
    const filteredCourses = filterCoursesByMonth(courses, month);
    return NextResponse.json({ course: filteredCourses, user: user.Name, }, {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) { return NextResponse.json({ error: error.message }, { status: 500 }) }
}

function filterCoursesByMonth(courses, month) {
  const filteredLessons = {};
  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();

  courses.forEach(course => {
    course.Detail.forEach(lesson => {
      if (lesson.Day.split("/")[1] === month) {
        const lessonDay = lesson.Day;
        if (!filteredLessons[lessonDay]) {
          filteredLessons[lessonDay] = [];
        }
        // Bỏ đi trường Day và thêm CourseID
        const { Day, ...otherProps } = lesson;
        filteredLessons[lessonDay].push({ ...otherProps, CourseID: course.ID });
      }
    });
  });

  // Nếu ngày hiện tại thuộc tháng được truyền vào, thêm ngày hiện tại
  if (currentMonth === parseInt(month, 10)) {
    const todayString = `${currentDay.toString().padStart(2, '0')}/${currentMonth.toString().padStart(2, '0')}/${currentYear}`;
    if (!filteredLessons[todayString]) {
      filteredLessons[todayString] = []; // Tạo key nếu chưa có
    }
  }

  // Sắp xếp theo ngày
  const sortedLessons = Object.keys(filteredLessons)
    .sort((a, b) => {
      const [dayA, monthA, yearA] = a.split("/").map(Number);
      const [dayB, monthB, yearB] = b.split("/").map(Number);
      return new Date(yearA, monthA - 1, dayA) - new Date(yearB, monthB - 1, dayB);
    })
    .reduce((acc, day) => {
      acc[day] = filteredLessons[day];
      return acc;
    }, {});
  return sortedLessons;
}
