import PostUser from "@/models/postUser";
import connectDB from "@/config/database";
import { authenticate } from '@/utils/authenticate'
import { NextResponse } from 'next/server'


export async function POST(request) {
  try {
    const { user, body } = await authenticate(request)
    const per = user.role.Permission.User.create

    let data = null
    let message = 'Bạn không có quyền thực thi api này';
    let status = 200
    let { Name, Phone, Email, Role, Address } = body
    Role = { [Role]: { Course: 1, User: 1, Student: 1 } }

    switch (per.level) {
      case 'All':
        await connectDB();
        let Avt = ''
        let Password = Phone
        const newPost = new PostUser({ Name, Phone, Email, Role, Address, Password, Avt });
        await newPost.save();
        message = 'Thêm người dùng thành công';
        data = newPost
        break;
      case 'Block':
        status = 403;
        break;
      default:
        status = 403
        break
    }

    return new Response(JSON.stringify({
      air: status == 200 ? 2 : 1, data, mes: message
    }), { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { air: 0, mes: error.message, data: null },
      { status: error.message === 'Authentication failed' ? 401 : 500 }
    );
  }
}