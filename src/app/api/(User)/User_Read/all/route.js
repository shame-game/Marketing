import connectDB from '@/config/database'
import PostUser from '@/models/postUser'
import { NextResponse } from 'next/server';
import { authenticate } from '@/utils/authenticate';

export const preferredRegion = process.env.area;

export async function POST(request) {
  try {
    const { user } = await authenticate(request)
    const coursePermission = user.role.Permission.User.read
    let data
    let message = 'Lấy dữ liệu thành công'
    let status = 200
    await connectDB();
    switch (coursePermission.level) {
      case 'All':
        data = await PostUser.find({}, { Password: 0 });
        break;
      case 'Block':
        message = 'Bạn không có quyền truy cập dữ liệu này!';
        data = null;
        status = 403;
        break;
      default:
        message = 'Bạn không có quyền truy cập dữ liệu này!'
        data = null;
        status = 403
        break
    }
    return NextResponse.json(
      { air: status === 200 ? 2 : 1, mes: message, data },
      { status }
    );
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { air: 0, mes: error.message, data: null },
      { status: error.message === 'Authentication failed' ? 401 : 500 }
    )
  }
}
