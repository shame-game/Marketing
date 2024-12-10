import PostCourse from "@/models/postCourse";
import PostModel from "@/models/postTask";
import connectDB from "@/config/database";
import { authenticate } from '@/utils/authenticate';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { user, body } = await authenticate(request);
    const coursePermission = user.role.Permission.Course.update.addStudent;

    const { id, newStudent } = body

    let data;
    let message = 'Lấy dữ liệu thành công';
    let status = 200;
    await connectDB();

    const course = await PostCourse.findOne({ _id: id }, { Detail: 1, ID: 1, Price: 1 });
    if (!course) {
      return NextResponse.json(
        { air: 1, mes: "Khóa học không tồn tại", data: id },
        { status: 404 }
      );
    }

    let attribute = {}
    course.Detail.forEach(e => { attribute[e.ID] = { Checkin: 0, Cmt: '', Note: '' } });
    switch (coursePermission.level) {
      case 'All':
        for (let i = 0; i < newStudent.length; i++) {
          const studentId = newStudent[i];
          const existingStudent = await PostModel.findById(studentId);
          if (!existingStudent) {
            continue;
          }
          const updatedCourse = {
            ...(existingStudent.Course || {}),
            [course.ID]: {
              StatusLearn: false,
              StatusPay: course.Price,
            },
          };

          const updatedStudent = await PostModel.findByIdAndUpdate(
            studentId,
            { $set: { Course: updatedCourse } },
            { new: true }
          );

          newStudent[i] = {
            _id: updatedStudent._id,
            ID: updatedStudent.ID,
            Name: updatedStudent.Name,
            Learn: attribute,
          };
        }

        const updatedStudents = course.Student
          ? newStudent.concat(course.Student)
          : newStudent;

        data = await PostCourse.findByIdAndUpdate(
          id,
          { $set: { Student: updatedStudents } },
          { new: true }
        );

        break;

      case 'Block':
        message = 'Bạn không có quyền truy cập dữ liệu này!';
        data = null;
        status = 403;
        break;

      default:
        message = 'Invalid permission level';
        data = null;
        status = 400;
        break;
    }

    return NextResponse.json(
      { air: status === 200 ? 2 : 1, mes: message, data },
      { status }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Server Error" }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
