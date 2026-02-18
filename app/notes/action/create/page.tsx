import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./CreateNote.module.css";
import {Metadata} from "next";

export const metadata : Metadata = {
    title: "NoteHub - Create Note",
    description: "Create a new note in NoteHub.",
    openGraph: {
      title: "NoteHub - Create Note",
      description: "Create a new note in NoteHub.",
      url: `https://08-zustand-ten-dusky.vercel.app/notes/create-note`,
      images: [
{
          url: " https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          alt: "NoteHub - Create Note",
        },
      ],
  },
}

export default function CreateNotePage() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}