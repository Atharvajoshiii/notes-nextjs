import { NextResponse } from "next/server";
import {connectToDatabase} from "@/lib/mongodb";
import Note from "@/models/Note";

export async function GET() {
  try {
    await connectToDatabase();
    const notes = await Note.find({});
    return NextResponse.json({ success: true, data: notes });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { title, content } = await req.json();
    await connectToDatabase();
    const newNote = await Note.create({ title, content });
    return NextResponse.json({ success: true, data: newNote }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
