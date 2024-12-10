import PostBook from "../../../models/postBook";
import connectDB from "../../../config/database";

export async function GetAllBook() {
  await connectDB();
  let allBook = JSON.parse(JSON.stringify(await PostBook.find()));
  return { allBook };
}