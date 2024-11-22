"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";

type Note = {
  _id: string;
  title: string;
  content: string;
};

export default function Dashboard() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editNoteId, setEditNoteId] = useState<string | null>(null);

  // Fetch notes from the API
  useEffect(() => {
    async function fetchNotes() {
      const res = await fetch("/api/notes");
      const data = await res.json();
      if (data.success) {
        setNotes(data.data);
      }
    }
    fetchNotes();
  }, []);

  // Add or Update Note
  const handleSave = async () => {
    const method = editNoteId ? "PUT" : "POST";
    const url = editNoteId ? `/api/notes/${editNoteId}` : "/api/notes";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });

    const data = await res.json();
    if (data.success) {
      setTitle("");
      setContent("");
      setEditNoteId(null);
      fetchNotes(); // Refresh notes
    }
  };

  // Delete Note
  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/notes/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (data.success) {
      fetchNotes(); // Refresh notes
    }
  };

  // Load note for editing
  const handleEdit = (note: Note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditNoteId(note._id);
  };

  // Refresh notes
  const fetchNotes = async () => {
    const res = await fetch("/api/notes");
    const data = await res.json();
    if (data.success) {
      setNotes(data.data);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Notes Dashboard</h1>

      {/* Add/Edit Note Form */}
      <Dialog>
        <DialogTrigger>
          <Button variant="default">{editNoteId ? "Edit Note" : "Add Note"}</Button>
        </DialogTrigger>
        <DialogContent>
          <div className="space-y-4">
            <Input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Textarea
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <Button onClick={handleSave}>{editNoteId ? "Update Note" : "Create Note"}</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Notes Table */}
      <table className="w-full border-collapse border border-gray-300 mt-4">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Title</th>
            <th className="border border-gray-300 px-4 py-2">Content</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {notes.map((note) => (
            <tr key={note._id}>
              <td className="border border-gray-300 px-4 py-2">{note.title}</td>
              <td className="border border-gray-300 px-4 py-2">{note.content}</td>
              <td className="border border-gray-300 px-4 py-2 space-x-2">
                <Button size="sm" variant="secondary" onClick={() => handleEdit(note)}>
                  Edit
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(note._id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
