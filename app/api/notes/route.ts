import { NextResponse } from "next/server";
import {connectToDatabase} from "@/lib/mongodb";
import Note from "@/models/Note";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    await connectToDatabase();

    const id = params.id;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Note ID is required." },
        { status: 400 }
      );
    }

    const note = await Note.findById(id);

    if (!note) {
      return NextResponse.json(
        { success: false, message: "Note not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: note });
  } catch (error) {
    console.error("GET /api/notes/[id] Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error. Please try again later.",
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    await connectToDatabase();

    const id = params.id;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Note ID is required." },
        { status: 400 }
      );
    }

    const body = await req.json().catch(() => {
      throw new Error("Invalid JSON input.");
    });

    const { title, content } = body;

    if (!title || !content) {
      return NextResponse.json(
        { success: false, message: "Title and content are required." },
        { status: 400 }
      );
    }

    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, content },
      { new: true, runValidators: true }
    );

    if (!updatedNote) {
      return NextResponse.json(
        { success: false, message: "Note not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updatedNote });
  } catch (error) {
    console.error("PUT /api/notes/[id] Error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Internal server error.",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    await connectToDatabase();

    const id = params.id;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Note ID is required." },
        { status: 400 }
      );
    }

    const deletedNote = await Note.findByIdAndDelete(id);

    if (!deletedNote) {
      return NextResponse.json(
        { success: false, message: "Note not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: deletedNote });
  } catch (error) {
    console.error("DELETE /api/notes/[id] Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error. Please try again later.",
      },
      { status: 500 }
    );
  }
}
