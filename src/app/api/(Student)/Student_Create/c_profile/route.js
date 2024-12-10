import PostModel from "@/models/postModels";
import connectDB from "@/config/database";
import { authenticate } from '@/utils/authenticate'
import { NextResponse } from 'next/server'


export async function POST(request) {
  try {
    const { user, body } = await authenticate(request)
    const per = user.role.Permission.Student.create.c_profile

    let data
    let message = 'Lấy dữ liệu thành công'
    let status = 200
    let { ID, Name } = body

    switch (per.level) {
      case 'All':
        await connectDB();
        let student = await PostModel.findOneAndUpdate(
          { ID: ID },
          {
            Profile: {
              Avatar: "",
              ImgPJ: [],
              ImgSkill: "",
              Intro: `Xin chào! tên tôi là ${Name}, tôi là học viên của trung tâm AI ROBOTIC. Tôi rất đam mê với công nghệ và đặc biệt là trí tuệ nhân tạo với robotic vì vậy tôi đã đăng ký khóa học này để thảo mãn đam mê của mình.
          Theo tôi đây là một khóa học vô cùng thú vị bởi vì khóa học áp dụng phương pháp STEM có lý thuyết có thức hành và mỗi buổi tôi đều có thể tạo ra được một mô hình liên quan đến chủ đề học.
          Tôi thích từng bước của quá trình học tập AI ROBOTIC Từ lý thuyết đến lắp ráp robot rồi đến lập trình mô hình.`,
              Present: {},
              Skill: {
                "Sự tiến bộ và Phát triển": "100",
                "Kỹ năng giao tiếp": "100",
                "Diễn giải vấn đề": "100",
                "Tự tin năng động": "100",
                "Đổi mới sáng tạo": "100",
                "Giao lưu hợp tác": "100"
              }
            }
          },
          { new: true }
        );
        message = 'Thêm học sinh thành công';
        data = student
        break;
      case 'Block':
        message = 'Bạn không có quyền truy cập dữ liệu này!';
        data = null;
        status = 403;
        break;
      default:
        message = 'Invalid permission level'
        data = null;
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