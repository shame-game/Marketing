

import connectDB from '@/config/database';
import PostModel from "@/models/postModels";

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const IdStudent = searchParams.get('ID')
    const Course = searchParams.get('Course')
    const Student = await PostModel.findOne({ ID: IdStudent })
    return new Response(JSON.stringify(Student.Course[Course]), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) { return new Response(JSON.stringify({ error: 'lỗi' }), { status: 500, headers: { 'Content-Type': 'application/json' } }); }
}
