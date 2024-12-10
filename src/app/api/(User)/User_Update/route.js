import PostUser from "@/models/postUser";
import connectDB from "@/config/database";
import { authenticate } from '@/utils/authenticate'
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const { user, body } = await authenticate(request)
    const per = user.role.Permission.User.update

    let data = null
    let message = 'Bạn không có quyền thực thi API này';
    let status = 200

    let { id, Phone, Email, Role, Avt, Password } = body

    if (!Email) {
      return NextResponse.json(
        { air: 0, mes: 'Email là trường bắt buộc để cập nhật người dùng', data: null },
        { status: 400 }
      );
    }

    switch (per.level) {
      case 'All':
        await connectDB();

        const existingUser = await PostUser.findOne({ Email: id });
        if (!existingUser) {
          return NextResponse.json(
            { air: 1, mes: 'Người dùng không tồn tại', data: null },
            { status: 404 }
          );
        }

        if (Phone !== undefined) existingUser.Phone = Phone;
        if (Role !== undefined) existingUser.Role = { [Role]: { Course: 1, User: 1, Student: 1 } };
        if (Avt !== undefined) existingUser.Avt = Avt;
        if (Password !== undefined) existingUser.Password = Password;

        // Lưu người dùng đã cập nhật vào cơ sở dữ liệu
        await existingUser.save();

        message = 'Cập nhật người dùng thành công';
        data = existingUser;
        break;

      case 'Block':
      default:
        status = 403;
        break
    }

    // Trả về phản hồi thành công hoặc thất bại
    return NextResponse.json({
      air: status === 200 ? 2 : 1,
      data,
      mes: message
    }, { status: 200 }); // Đặt status thành 200 cho thành công
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { air: 0, mes: error.message, data: null },
      { status: error.message === 'Authentication failed' ? 401 : 500 }
    );
  }
}
