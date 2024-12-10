import { NextResponse } from 'next/server';
import dbConnect from '@/config/database';
import PostUser from '@/models/postUser';
import PostPermission from '@/models/postPermission';
import { authenticate } from '@/utils/authenticate';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

// Note: Api check token và trả về thông tin người dùng
export async function POST(request) {
  try {
    const { user } = await authenticate(request);
    if (!user) { return NextResponse.json({ air: 0, mes: 'Xác thực thất bại!' }, { status: 401 }) }
    await dbConnect();

    const users = await PostUser.findOne({ _id: user.userId }, { Name: 1, Avt: 1, Role: 1 });
    if (!users) { return NextResponse.json({ air: 0, mes: 'Người dùng không tồn tại!' }, { status: 404 }) }
    const role = await PostPermission.findOne({ ID: Object.keys(users.Role)[0] }, { _id: 0 });
    let c = 2

    if (JSON.stringify(user.role) != JSON.stringify(role) || user.role == null) {
      c = 0
      let accessToken = jwt.sign({ userId: user.userId, role: role }, process.env.JWT_SECRET);
      const cookieStore = cookies();
      cookieStore.set('u', accessToken, { httpOnly: true, path: '/', maxAge: 60 * 60 * 24 * 365 * 10 });
    }
    users.Role = role;
    return NextResponse.json({ air: c, mes: 'Lấy thông tin người dùng thành công!', data: users }, { status: 200 })
  } catch (error) {
    console.log(error);

    return NextResponse.json({ air: 0, mes: 'Đã xảy ra lỗi trong quá trình xử lý!', error: error.message }, { status: 500 })
  }
}
