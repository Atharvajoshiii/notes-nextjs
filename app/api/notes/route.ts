import { NextResponse } from "next/server";
import {connectToDatabase} from "@/lib/mongodb";
import Note from "@/models/Note";

export async function GET(): Promise<NextResponse> {
  try {
    await connectToDatabase();
    const notes = await Note.find({});
    return NextResponse.json({ success: true, data: notes });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const { title, content } = (await req.json()) as {
      title: string;
      content: string;
    };
    await connectToDatabase();
    const newNote = await Note.create({ title, content });
    return NextResponse.json({ success: true, data: newNote }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 500 }
    );
  }
}
