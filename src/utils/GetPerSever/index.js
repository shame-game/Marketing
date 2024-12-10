import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export default async function GetPerSever() {
  const token = cookies().get('u')?.value;
  let decodedToken = jwt.verify(token, process.env.JWT_SECRET)
  return decodedToken
}