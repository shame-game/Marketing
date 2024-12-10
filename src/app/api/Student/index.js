import postModel from "@/models/postTask";
import connectDB from "@/config/database";


export async function GetStudentByID(IDstudent) {
  await connectDB();
  const student = await postModel.findOne({ ID: IDstudent });
  if (student) {
    return { student: JSON.parse(JSON.stringify(student)) };
  } else {
    return null;
  }
}