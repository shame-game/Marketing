
import connectDB from '@/config/database';
import PostCourse from "@/models/postCourse";
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export const preferredRegion = process.env.area

export async function POST(request) {
  try {
    const { course, lesson, teacher, ass } = await request.json();
    const token = request.cookies.get('accessToken')?.value;
    if (!token) return NextResponse.json({ air: 0 }, { status: 401 })
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken.role.includes('MG') && !decodedToken.role.includes('AD') && !decodedToken.role.includes('TC')) return NextResponse.json({ air: 1 }, { status: 401 })

    await connectDB();
    const Course = await PostCourse.findByIdAndUpdate(course,
      {
        $set: {
          "Detail.$[elem].Teacher": teacher,
          "Detail.$[elem].TeachingAs": ass
        }
      },
      {
        new: true,
        arrayFilters: [{ "elem.ID": lesson }]
      })
    return new Response(JSON.stringify({ air: 2, data: Course.Detail }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) { return new Response(JSON.stringify({ error: 'lỗi' }), { status: 500, headers: { 'Content-Type': 'application/json' } }); }
}
