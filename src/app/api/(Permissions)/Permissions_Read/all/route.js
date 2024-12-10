import PostPermission from '@/models/postPermission'
import connectDB from '@/config/database'
import { authenticate } from '@/utils/authenticate'
import { NextResponse } from 'next/server'

export const preferredRegion = process.env.area

export async function POST(request) {
  try {
    // Kiểm tra
    const { user } = await authenticate(request)
    let data;
    let status = 200
    let message;
    const Permission = user.role.Permission.Personnel.read;
    await connectDB();
    switch (Permission.level) {
      case 'All':
        data = await PostPermission.find({});
        break;
      case 'Block':
        message = 'Bạn không có quyền truy cập dữ liệu này!';
        data = null;
        status = 403;
        break;
      default:
        message = 'Invalid permission level'
        data = null
        status = 403
        break
    }
    return NextResponse.json(
      { air: status === 200 ? 2 : 1, mes: message, data },
      { status }
    );
  } catch (error) {
    return NextResponse.json(
      { air: 0, mes: error.message, data: null },
      { status: error.message === 'Authentication failed' ? 401 : 500 }
    )
  }
}
