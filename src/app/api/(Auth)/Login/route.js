import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import connectDB from '@/config/database';
import PostUser from '@/models/postUser';
import PostPermission from '@/models/postPermission';

export async function POST(request) {
  try {
    await connectDB();
    const { email, password } = await request.json();

    const user = await PostUser.findOne({ Email: email });
    const userObject = user.toObject();
    if (!user) {
      return new Response(JSON.stringify({ error: 'Tài khoản không tồn tại!' }), { status: 404 });
    } else if (password != userObject.Password) {
      return new Response(JSON.stringify({ error: 'Mật khẩu của bạn không chính xác!' }), { status: 401 });
    } else {
      const PostPer = await PostPermission.findOne({ ID: Object.keys(userObject.Role)[0] }, { _id: 0 })
      const accessToken = jwt.sign({ userId: userObject._id, role: PostPer }, process.env.JWT_SECRET);
      const cookieStore = cookies();
      cookieStore.set('u', accessToken, { httpOnly: true, path: '/', maxAge: 60 * 60 * 24 * 365 * 10 });
      return new Response(JSON.stringify({ message: 'Đăng nhập thành công', data: PostPer }), { status: 200 });
    }
  } catch (error) {
    console.log(error);

    return new Response(JSON.stringify({ message: error }), { status: 500 });
  }
}