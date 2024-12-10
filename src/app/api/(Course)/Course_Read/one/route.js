import connectDB from '@/config/database';
import PostCourse from '@/models/postProject';
import { authenticate } from '@/utils/authenticate';
import { NextResponse } from 'next/server';

export const preferredRegion = process.env.area;

export async function POST(request) {

  try {
    const { user, body } = await authenticate(request);
    const coursePermission = user.role.Permission.Course.read;

    const { ID } = body

    let data;
    let message = 'Lấy dữ liệu thành công';
    let status = 200;

    await connectDB();

    let queryCondition = {};
    if (ID) { queryCondition.ID = ID }

    switch (coursePermission.level) {
      case 'All':
        data = await PostCourse.findOne({ ID: ID }, { Price: 0 });
        break;
      case 'Block':
        // User has no access
        message = 'Bạn không có quyền truy cập dữ liệu này!';
        data = null;
        status = 403;
        break;

      case 'Area':
        // User has access to courses in specific areas
        queryCondition.Area = { $in: coursePermission.areas };
        data = await PostCourse.findOne(queryCondition, { Price: 0 });
        break;

      case 'Specific':
      case 'Homeroom':
        if (ID) {
          // Check if the user has permission for the specific course ID
          if (coursePermission.spec.includes(ID)) {
            data = await PostCourse.findOne(queryCondition, { Price: 0 });
          } else {
            message = 'Bạn không có quyền truy cập dữ liệu này!';
            data = null;
            status = 403;
          }
        } else {
          // User wants all courses they have specific access to
          queryCondition.ID = { $in: coursePermission.spec };
          data = await PostCourse.findOne(queryCondition, { Price: 0 });
        }
        break;

      default:
        message = 'Invalid permission level';
        data = null;
        status = 400;
        break;
    }

    return NextResponse.json(
      { air: status === 200 ? 2 : 1, mes: message, data: data },
      { status }
    );
  } catch (error) {
    return NextResponse.json(
      { air: 0, mes: error.message, data: null },
      { status: error.message === 'Authentication failed' ? 401 : 500 }
    );
  }
}
