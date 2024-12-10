import { google } from "googleapis";
import { NextResponse } from "next/server";
import { Readable } from "stream";
import sharp from "sharp";
import PostCourse from "@/models/postCourse";
import connectDB from "@/config/database";
const auth = new google.auth.GoogleAuth({
  credentials: {
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
  },
  projectId: process.env.GOOGLE_PROJECT_ID,
  scopes: ["https://www.googleapis.com/auth/drive.file"],
});

const drive = google.drive({ version: "v3", auth });

// Chuyển Buffer thành Stream
function bufferToStream(buffer) {
  const stream = new Readable();
  stream.push(buffer);
  stream.push(null);
  return stream;
}

// Giảm kích thước hình ảnh bằng sharp (tùy chọn)
async function resizeImage(buffer, maxWidth = 1024, maxHeight = 1024) {
  return sharp(buffer)
    .resize({ width: maxWidth, height: maxHeight, fit: "inside" })
    .toBuffer();
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("file");
    const folderId = formData.get("folderId") || "1DduCVLUALwz44kMOp_xAAs5rBfphK3vU";
    const course = formData.get("courseId");
    const lesson = formData.get("lessonId");
    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files uploaded" }, { status: 400 });
    }

    // Tải lên đồng thời
    const uploadPromises = files.map(async (file) => {
      const arrayBuffer = await file.arrayBuffer();
      let buffer = Buffer.from(arrayBuffer);

      // Giảm kích thước hình ảnh nếu cần
      if (file.type.startsWith("image/")) {
        buffer = await resizeImage(buffer); // Resize image
      }

      const fileMetadata = {
        name: file.name,
        parents: [folderId],
      };

      const media = {
        mimeType: file.type,
        body: bufferToStream(buffer),
      };

      const response = await drive.files.create({
        requestBody: fileMetadata,
        media: media,
        fields: "id", // Chỉ lấy thông tin ID
      });

      return { fileId: response.data.id, name: file.name };
    });

    const uploadedFiles = await Promise.all(uploadPromises);
    await connectDB()
    const courseData = await PostCourse.findById(course)
    const updatedDetails = courseData.Detail.map((detail) => {
      if (detail.ID === lesson) {
        // Nếu đã có ImageLink, thêm newImage
        if (detail.ImageLink) {
          return {
            ...detail,
            ImageLink: uploadedFiles.map(item => 'https://lh3.googleusercontent.com/d/' + item.fileId).concat(...detail.ImageLink),
          };
        } else {
          // Nếu chưa có ImageLink, thêm trường mới
          return {
            ...detail,
            ImageLink: uploadedFiles.map(item => 'https://lh3.googleusercontent.com/d/' + item.fileId),
          };
        }
      }
      return detail; // Giữ nguyên các phần tử khác
    });

    // Cập nhật vào cơ sở dữ liệu
    await PostCourse.findByIdAndUpdate(
      course,
      { $set: { Detail: updatedDetails } },
      { new: true }
    );
    return NextResponse.json({ air: 2, data: uploadedFiles, mes: 'Tải hình ảnh thành công' });
  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json({ error: "Không thể tải hình ảnh" }, { status: 500 });
  }
}
