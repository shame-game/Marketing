import connectDB from '@/config/database';
import PostInvoices from '@/models/postInvoices';
import { authenticate } from '@/utils/authenticate';
import { NextResponse } from 'next/server';

export const preferredRegion = process.env.area;

export async function POST(request) {
  try {
    const { user, body } = await authenticate(request);
    const studentPermission = user.role.Permission.Invoices.read;

    const { overview } = body;

    let data;
    let message = 'Lấy dữ liệu thành công';
    let status = 200;

    await connectDB();

    switch (studentPermission.level) {
      case 'All':
        if (!overview) {
          // Fetch all data without aggregation
          data = await PostInvoices.find({}, {});
        } else {
          // Use Mongoose aggregate
          data = await PostInvoices.aggregate([
            {
              $lookup: {
                from: 'courses',
                localField: 'CourseID',  // Field in invoices
                foreignField: 'ID',      // Field in courses
                as: 'courseData',
              },
            },
            { $unwind: '$courseData' }, // Deconstruct the courseData array
            {
              $project: {
                Amount_paid: 1,
                createdAt: 1,
                'courseData.Area': 1,
                _id: 0,
              },
            },
          ]); // No `.toArray()` needed
        }
        break;
      default:
        message = 'Bạn không có quyền truy cập tài nguyên này';
        data = null;
        status = 400;
        break;
    }

    return NextResponse.json(
      { air: status === 200 ? 2 : 1, mes: message, data },
      { status }
    );
  } catch (error) {
    return NextResponse.json(
      { air: 0, mes: error.message, data: null },
      { status: error.message === 'Authentication failed' ? 401 : 500 }
    );
  }
}
