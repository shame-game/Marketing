import postCourse from "../../../models/postCourse";
import connectDB from "../../../config/database";

export async function GetAllCourse() {
  await connectDB();
  let allCourse = JSON.parse(JSON.stringify(await postCourse.find()));
  return { allCourse };
}