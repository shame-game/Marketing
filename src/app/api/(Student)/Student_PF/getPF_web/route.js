import connectDB from "@/config/database";
import PostModel from "@/models/postTask";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const ID = searchParams.get('ID');
  await connectDB();
  const data = await PostModel.findOne(
    { ID: ID },
    { Name: 1, Profile: 1, _id: 0, Course: 1 }
  );

  const headers = new Headers({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    // Thêm header Cache-Control
    "Cache-Control": "no-store",
  });

  if (!data) {
    return new Response(JSON.stringify({ air: 0, data: null }), { headers });
  }

  return new Response(
    JSON.stringify({
      air: 2,
      data: data.Profile,
      name: data.Name,
      course: data.Course,
    }),
    { headers }
  );
}

export async function OPTIONS(request) {
  const headers = new Headers({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Cache-Control": "no-store",
  });
  return new Response(null, { headers });
}
