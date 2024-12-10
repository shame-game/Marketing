import { cookies } from 'next/headers';

export async function POST() {
  const cookieStore = cookies();
  const u = cookieStore.get('u')?.value;

  if (!u) {
    return new Response(JSON.stringify({ error: 'No refresh token found' }), { status: 401 });
  }

  cookieStore.set('u', '', { httpOnly: true, path: '/', maxAge: 0 });
  return new Response(JSON.stringify({ message: 'Logged out successfully' }), { status: 200 });
}