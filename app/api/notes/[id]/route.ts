import { NextResponse } from "next/server";
import {connectToDatabase} from "@/lib/mongodb";
import Note from "@/models/Note";
import { ObjectId } from "mongodb";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    const note = await Note.findById(params.id);
    if (!note) {
      return NextResponse.json({ success: false, message: "Note not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: note });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { title, content } = await req.json();
    await connectToDatabase();
    const updatedNote = await Note.findByIdAndUpdate(
      params.id,
      { title, content },
      { new: true, runValidators: true }
    );
    if (!updatedNote) {
      return NextResponse.json({ success: false, message: "Note not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: updatedNote });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    const deletedNote = await Note.findByIdAndDelete(params.id);
    if (!deletedNote) {
      return NextResponse.json({ success: false, message: "Note not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: deletedNote });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
