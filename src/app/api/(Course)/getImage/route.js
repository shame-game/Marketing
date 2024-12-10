import { NextResponse } from 'next/server';
import PostCourse from '@/models/postProject';
import connectDB from '@/config/database';

export async function POST(request) {
  try {
    const { course } = await request.json();
    await connectDB();
    let data = await PostCourse.findOne({ ID: course }, { Detail: 1, _id: 0 })
    data = { [course]: data.Detail }
    return NextResponse.json({ air: 2, data: data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Lỗi khi lấy dữ liệu' }, { status: 500 });
  }
}