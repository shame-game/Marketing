import PostModel from "@/models/postModels";
import connectDB from "@/config/database";
import { authenticate } from '@/utils/authenticate';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { user, body } = await authenticate(request);
    const coursePermission = user.role.Permission.Student.update.uPF
    const { id, newProfile, newCourse } = body
    let data;
    let message = 'Lấy dữ liệu thành công';
    let status = 200;
    await connectDB();
    switch (coursePermission.level) {
      case 'All':
        const Student = await PostModel.findByIdAndUpdate(id, { Profile: newProfile, Course: newCourse }, { new: true })
        data = Student
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
    return new Response(JSON.stringify({ error: error }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}