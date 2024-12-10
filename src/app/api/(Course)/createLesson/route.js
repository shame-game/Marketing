import connectDB from '@/config/database';
import PostCourse from "@/models/postProject";
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export const preferredRegion = process.env.area
export async function POST(request) {
  try {
    const { course, ID, topic, room, day, lesson, teacher, ass, image, student } = await request.json();
    const token = request.cookies.get('accessToken')?.value;
    if (!token) return NextResponse.json({ air: 0 }, { status: 401 })
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken.role.includes('MG') && !decodedToken.role.includes('AD') && !decodedToken.role.includes('TC')) return NextResponse.json({ air: 1 }, { status: 401 })

    await connectDB();
    let result = addHoursToTime(day.slice(-5).split(':')[0], day.slice(-5).split(':')[1], 3)

    const data = await fetch(`https://script.google.com/macros/s/AKfycbxuEkDOpizQf9EHB7y5gFnA3HqThyiYhawSu0Vc3AOiuTklKjSisNDvQsVW2SiDq9YZ/exec?Image=${image}&Day=${day.split('T')[0]}`)
    let f = await data.json()
    const Course = await PostCourse.findByIdAndUpdate(course,
      {
        $push: {
          Detail: {
            ID: ID,
            Day: day.split('T')[0].slice(-2) + '/' + day.split('T')[0].slice(5, 7) + '/' + day.split('T')[0].slice(0, 4),
            Teacher: teacher,
            TeachingAs: ass,
            Topic: topic,
            Lesson: lesson,
            Room: room,
            Time: day.slice(-5) + '-' + `${result.hours}:${result.minutes < 10 ? '0' : ''}${result.minutes}`,
            Supplemental: 1,
            Image: f.urls,
            Student: student
          }
        }
      },
      { new: true })
    return new Response(JSON.stringify({ air: 2, data: Course.Detail }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) { return new Response(JSON.stringify({ error: 'lỗi' }), { status: 500, headers: { 'Content-Type': 'application/json' } }); }
}


function addHoursToTime(hours, minutes, addHours) {
  let totalMinutes = Number(hours) * 60 + Number(minutes) + Number(addHours) * 60;
  const newHours = totalMinutes / 60
  const newMinutes = totalMinutes % 60;
  return { hours: newHours, minutes: newMinutes };
}