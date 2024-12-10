import { NextResponse } from 'next/server';
import connectDB from '@/config/database';
import PostInvoices from '@/models/postInvoices';
import PostModel from '@/models/postTask';
import { authenticate } from '@/utils/authenticate';


export async function POST(request) {
  try {
    const { user, body } = await authenticate(request);
    const studentPermission = user.role.Permission.Student.update.cBill;
    const { _id, StudentID, CourseID, Amount_due, Amount_paid, Discount, Payment_method } = body
    await connectDB();
    let data;
    let message = 'Xác nhận thanh toán thành công';
    let status = 200;
    switch (studentPermission.level) {
      case 'All':
        const invoice = new PostInvoices({ StudentID, CourseID, Amount_due, Amount_paid, Discount, Payment_method });
        const student = await PostModel.findByIdAndUpdate(_id, { [`Course.${CourseID}.StatusPay`]: invoice._id }, { new: true })
        data = student
        await invoice.save();
        break;
      default:
        message = 'Bạn không có quyền thực hiện chức năng này';
        data = null;
        status = 400;
        break;
    }
    return NextResponse.json(
      { air: status === 200 ? 2 : 1, mes: message, data },
      { status }
    );
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}