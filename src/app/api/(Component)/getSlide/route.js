import connectDB from '@/config/database';
import PostBook from '@/models/postBook';
export const preferredRegion = process.env.area
export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const topic = searchParams.get('topic')
    const course = await PostBook.findOne({ [`Topic.${topic}`]: { $exists: true } });
    const userObject = course.toObject();

    return new Response(JSON.stringify(userObject.Topic[`${topic}`].Slide), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) { return new Response(JSON.stringify({ error: 'lỗi' }), { status: 500, headers: { 'Content-Type': 'application/json' } }); }
}
