import PostModel from "@/models/postTask";
import connectDB from "@/config/database";

// api cập nhập thông tin học sinh
export async function PUT(request) {
  await connectDB();
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const body = await request.json();

    if (!id) {
      return new Response(JSON.stringify({ error: 'ID is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const updatedStudent = await PostModel.findByIdAndUpdate(id, body, { new: true });

    if (!updatedStudent) {
      return new Response(JSON.stringify({ error: 'Student not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify(updatedStudent), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}