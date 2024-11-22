import { NextResponse } from "next/server";
import {connectToDatabase} from "@/lib/mongodb";
import Note from "@/models/Note";

export async function GET(req: Request): Promise<NextResponse> {
  try {
    await connectToDatabase();

    // Extract the `id` parameter from the URL
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Note ID is required" },
        { status: 400 }
      );
    }

    const note = await Note.findById(id);
    if (!note) {
      return NextResponse.json(
        { success: false, message: "Note not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: note });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request): Promise<NextResponse> {
  try {
    // Extract the `id` parameter from the URL
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Note ID is required" },
        { status: 400 }
      );
    }

    const { title, content } = (await req.json()) as {
      title: string;
      content: string;
    };

    await connectToDatabase();

    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, content },
      { new: true, runValidators: true }
    );

    if (!updatedNote) {
      return NextResponse.json(
        { success: false, message: "Note not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: updatedNote });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request): Promise<NextResponse> {
  try {
    // Extract the `id` parameter from the URL
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Note ID is required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const deletedNote = await Note.findByIdAndDelete(id);
    if (!deletedNote) {
      return NextResponse.json(
        { success: false, message: "Note not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: deletedNote });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 500 }
    );
  }
}
