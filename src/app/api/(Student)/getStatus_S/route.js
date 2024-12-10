import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connectDB from '@/config/database';
import PostModel from "@/models/postModels";

export const preferredRegion = process.env.area

export async function GET(request) {
  try {
    // Kiểm tra
    const token = request.cookies.get('accessToken')?.value;
    if (!token) return NextResponse.json({ air: 0 }, { status: 401 })
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken.role.includes('MG') && !decodedToken.role.includes('AD')) return NextResponse.json({ air: 1 }, { status: 401 })

    // Kết nối 
    await connectDB();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status')
    const Student = await PostModel.find({ Status: status })
    
    // Xử lý
    return NextResponse.json({ air: 2, data: Student }, { status: 201 })
  } catch (error) { return NextResponse.json({ error: error }, { status: 500 }) }
}
