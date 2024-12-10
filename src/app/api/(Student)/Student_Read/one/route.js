import { NextResponse } from 'next/server';
import connectDB from '@/config/database';
import PostModel from "@/models/postTask";
import { authenticate } from '@/utils/authenticate';

export const preferredRegion = process.env.area

export async function POST(request) {
  try {
    await connectDB()
    const { ID } = await request.json()
    const Student = await PostModel.findOne({ ID: ID })
    return NextResponse.json({ air: 2, data: Student }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 })
  }
}
