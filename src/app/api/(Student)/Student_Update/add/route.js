import PostModel from "@/models/postModels";
import connectDB from "@/config/database";

export async function POST(request) {
  try {
    await connectDB();
    let { ID, BD, Name, Phone, Type, Area, Address, Status, Avt, Course, Email, ParentName, School } = await request.json();
    if (!ID) return new Response('ID là bắt buộc', { status: 400 });
    if (!Avt) Avt = 'https://lh3.googleusercontent.com/d/1Y-Dl9lHv4b4XjMZ5gW2DoRsC01UnAMn_'
    let Profile = {
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
    const newPost = new PostModel({ ID, BD, Name, Phone, Type, Area, Address, Status, Avt, Profile, Course, Email, ParentName, School, Profile });
    await newPost.save();
    return new Response(JSON.stringify(newPost), { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { air: 0, mes: error.message, data: null },
      { status: error.message === 'Authentication failed' ? 401 : 500 }
    );
  }
}