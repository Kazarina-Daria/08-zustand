import NoteDetails from "./NoteDetails.client";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const noteInfo = await fetchNoteById(id);
  return {
    title: `Note : ${noteInfo.title}`,
    description: noteInfo.content.slice(0, 30),
    openGraph: {
      title: `Note : ${noteInfo.title}`,
      description: noteInfo.content.slice(0, 100),
      url: `http://localhost:3000/notes/${id}`,
      images: [
{
          url: " https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          alt: `${noteInfo.title}`,
        },
      ],
    },
  };
}

export default async function NoteDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const qc = new QueryClient();

  await qc.prefetchQuery({
    queryKey: ["notes", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <NoteDetails />
    </HydrationBoundary>
  );
}
