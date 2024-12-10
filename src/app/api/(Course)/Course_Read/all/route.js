import connectDB from '@/config/database'
import PostCourse from "@/models/postCourse"
import { authenticate } from '@/utils/authenticate'
import { NextResponse } from 'next/server'
import { PagePromise } from 'openai/core'

export const preferredRegion = process.env.area

export async function POST(request) {
  try {
    // Kiểm tra
    const { user, body } = await authenticate(request)
    const coursePermission = user.role.Permission.Course.read

    const { overview } = body
    // Trả về
    let data
    let message = 'Lấy dữ liệu thành công'
    let status = 200

    await connectDB();
    switch (coursePermission.level) {
      case 'All':
        if (overview) {
          data = await PostCourse.find({}, { Status: 1, _id: 0 });
        } else {
          data = await PostCourse.find({}, { Price: 0 });
        }
        break;
      case 'Block':
        message = 'Bạn không có quyền truy cập dữ liệu này!';
        data = null;
        status = 403;
        break;
      case 'Area':
        data = await PostCourse.find(
          { Area: { $in: coursePermission.areas } },
          { Price: 0 }
        );
        message = coursePermission.areas;
        break;
      case 'Specific':
        data = await PostCourse.find(
          { ID: { $in: coursePermission.spec } },
          { Price: 0 }
        )
        break
      case 'Homeroom':
        data = await PostCourse.find(
          { ID: { $in: coursePermission.spec } },
          { Price: 0 }
        )
        break
      default:
        message = 'Invalid permission level'
        data = coursePermission.lever
        status = 200
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
