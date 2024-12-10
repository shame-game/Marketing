import PostCourse from "@/models/postCourse";
import connectDB from "@/config/database";
import PostBook from "@/models/postBook";
import { NextResponse } from 'next/server';
export const preferredRegion = process.env.area


export async function GET(request) {
  try {
    // Kết nối cơ sở dữ liệu
    await connectDB();
    const { searchParams } = new URL(request.url);
    const courseName = searchParams.get('courseName');
    const lessonsName = searchParams.get('lessonsName');

    if (!courseName || !lessonsName) {
      return NextResponse.json({ error: 'Missing courseName or lessonsName' }, { status: 400 });
    }

    const course = await PostCourse.findOne(
      { ID: courseName, 'Detail.ID': lessonsName },
      { 'Detail.$': 1, Student: 1 }
    ).lean();

    // Nếu không tìm thấy khóa học
    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    // Lọc danh sách học sinh chỉ giữ lại dữ liệu cho bài học tương ứng
    course.Student = course.Student.map(student => ({
      ...student,
      Learn: { [lessonsName]: student.Learn[lessonsName] }
    }));

    // Truy vấn slide liên quan đến bài học từ PostBook
    const slide = await PostBook.findOne(
      { ID: courseName.slice(2, 5) },
      { [`Topic.${lessonsName}.Slide`]: 1 }
    ).lean();
    let sl = 0
    // Nếu không tìm thấy slide
    if (slide?.Topic?.[lessonsName]?.Slide) {
      sl = slide.Topic[lessonsName].Slide
    } 
    course.Detail = course.Detail[0]
    // Trả về dữ liệu course và slide
    return NextResponse.json({ course, slide: sl}, { status: 200 });

  } catch (error) {
    // Xử lý lỗi
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
