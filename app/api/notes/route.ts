import { NextResponse } from "next/server";
import {connectToDatabase} from "@/lib/mongodb";
import Note from "@/models/Note";

export async function GET(): Promise<NextResponse> {
  try {
    // Connect to the database
    await connectToDatabase();

    // Fetch all notes from the database
    const notes = await Note.find({});

    // Return a successful response
    return NextResponse.json({ success: true, data: notes });
  } catch (error) {
    console.error("GET /api/notes Error:", error);

    // Handle errors
    return NextResponse.json(
      { success: false, message: "Failed to fetch notes." },
      { status: 500 }
    );
  }
}

export async function POST(req: Request): Promise<NextResponse> {
  try {
    // Parse the JSON body from the request
    const { title, content } = (await req.json()) as {
      title: string;
      content: string;
    };

    // Validate input
    if (!title || !content) {
      return NextResponse.json(
        { success: false, message: "Title and content are required." },
        { status: 400 }
      );
    }

    // Connect to the database
    await connectToDatabase();

    // Create a new note in the database
    const newNote = await Note.create({ title, content });

    // Return a successful response
    return NextResponse.json({ success: true, data: newNote }, { status: 201 });
  } catch (error) {
    console.error("POST /api/notes Error:", error);

    // Handle errors
    return NextResponse.json(
      { success: false, message: "Failed to create note." },
      { status: 500 }
    );
  }
}
