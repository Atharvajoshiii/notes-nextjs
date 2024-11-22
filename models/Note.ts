import mongoose, { Schema, Document, Model } from "mongoose";

// Define the TypeScript interface for the Note
export interface INote extends Document {
  title: string;
  content?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Create the schema for the Note
const NoteSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Check if the model already exists (to avoid re-compiling in dev)
const Note: Model<INote> =
  mongoose.models.Note || mongoose.model<INote>("Note", NoteSchema);

export default Note;
