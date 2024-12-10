import PostModel from "@/models/postModels";
import connectDB from "@/config/database";

export default async function GetAllStudent() {
  await connectDB();
  let allStudent = JSON.parse(JSON.stringify(await PostModel.find()));
  return { allStudent };
}