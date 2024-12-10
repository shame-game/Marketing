
import connectDB from '@/config/database';
import PostCourse from "@/models/postCourse";
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export const preferredRegion = process.env.area

export async function POST(request) {
  try {
    const { course, ID, lesson, reason } = await request.json();
    const token = request.cookies.get('accessToken')?.value;
    if (!token) return NextResponse.json({ air: 0 }, { status: 401 })
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken.role.includes('MG') && !decodedToken.role.includes('AD') && !decodedToken.role.includes('TC')) return NextResponse.json({ air: 1 }, { status: 401 })
    await connectDB();
    await PostCourse.findByIdAndUpdate(course,
      {
        $set: {
          [`Student.$[elem].Learn.${lesson}.Note`]: reason,
          [`Student.$[elem].Learn.${lesson}.Checkin`]: 3
        }
      },
      { new: true, arrayFilters: [{ "elem.ID": ID }] }
    );
    return new Response(JSON.stringify({ air: 2 }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) { return new Response(JSON.stringify({ error: 'lỗi' }), { status: 500, headers: { 'Content-Type': 'application/json' } }); }
}
