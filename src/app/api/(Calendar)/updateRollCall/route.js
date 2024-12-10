import PostCourse from "@/models/postProject";
import connectDB from "@/config/database";
export const preferredRegion = process.env.area

export async function POST(request) {
  try {
    await connectDB();
    const { Course, Lessons, Data } = await request.json();
    let course = await PostCourse.findOne({ ID: Course });
    let newStudent = course.Student
    for (let i in newStudent) {
      for (let j in Data) {
        if (Data[j].ID == newStudent[i].ID) {
          newStudent[i].Learn[Lessons] = Data[j].Learn[Lessons]
        }
      }
    }
    let newRollCall = await PostCourse.findByIdAndUpdate(course._id, { Student: newStudent }, { new: true })
    return new Response(JSON.stringify(newRollCall), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) { return new Response(JSON.stringify({ error: 'lỗi' }), { status: 500, headers: { 'Content-Type': 'application/json' } }); }
}