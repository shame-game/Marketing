import PostCourse from "@/models/postProject";
import connectDB from "@/config/database";

export async function POST(request) {
  await connectDB();
  let { ID, Address, Name, Progress, Status, Type, Detail, TimeEnd, TimeStart, Price, Area, Student, TeacherHR } = await request.json();
  if (!ID) return new Response('ID là bắt buộc', { status: 400 });
  const newPost = new PostCourse({ ID, Address, Name, Progress, Status, Type, Detail, TimeEnd, TimeStart, Price, Area, Student, TeacherHR });
  await newPost.save();
  return new Response(JSON.stringify(newPost), { status: 201 });
}