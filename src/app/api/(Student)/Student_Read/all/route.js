import connectDB from '@/config/database';
import PostModel from '@/models/postTask';
import { authenticate } from '@/utils/authenticate';
import { NextResponse } from 'next/server';

export const preferredRegion = process.env.area;

export async function POST(request) {
  try {
    const { user, body } = await authenticate(request);
    const studentPermission = user.role.Permission.Student.read;

    const { overview } = body

    let data;
    let message = 'Data retrieved successfully';
    let status = 200;

    await connectDB();

    switch (studentPermission.level) {
      case 'All':
        overview ?
          data = await PostModel.find({}, { Status: 1, _id: 0 }) :
          data = await PostModel.find({}, { sensitiveField: 0 })
        break;
      case 'Block':
        message = 'You do not have permission to access this data!';
        data = null;
        status = 403;
        break;
      case 'Area':
        data = await PostModel.find(
          { area: { $in: studentPermission.areas } },
          { sensitiveField: 0 }
        );
        break;
      case 'Specific':
        data = await PostModel.find(
          { ID: { $in: studentPermission.spec } },
          { sensitiveField: 0 }
        );
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
    console.log(error);

    return NextResponse.json(
      { air: 0, mes: error.message, data: null },
      { status: error.message === 'Authentication failed' ? 401 : 500 }
    );
  }
}
