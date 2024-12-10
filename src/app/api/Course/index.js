import PostCourse from "../../../models/postCourse";
import connectDB from "../../../config/database";


export async function GetCourseByID(CourseID) {
  await connectDB();
  const course = await PostCourse.findOne({ ID: CourseID });
  return course
}