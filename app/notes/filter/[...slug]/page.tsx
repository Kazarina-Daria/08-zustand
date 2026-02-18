import {fetchNotes, NoteTag} from "@/lib/api";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { Metadata } from "next";

interface Props {
    params : Promise<{slug?: string[]}> ;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const filterPage = slug?.join(", ") || "all";

  return {
    title: `NoteHub - filter: ${filterPage}`,
    description: `List of notes by categories: ${filterPage}`,
    openGraph: {
      title: `Notes by filter: ${filterPage}`,
      description: `Viewing results for ${filterPage}`,
      url: `https://08-zustand-ten-dusky.vercel.app/notes/filter/${slug?.join("/")}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          alt: `NoteHub - ${filterPage}`,
        },
      ],
    },
  };
}

const PER_PAGE = 12;
export default async function FilterPage ({params} :  Props){
const resolvedParams= await params;
const slug = resolvedParams.slug || [];
const filter = slug[0] ?? "all";
const tag = (filter === "all" ? "all" : filter) as NoteTag | "all";
const res = await fetchNotes("", 1, PER_PAGE, tag);
  const qc = new QueryClient();
await qc.prefetchQuery({
queryKey : ["notes", PER_PAGE, tag, 1, ""],
queryFn:()=>fetchNotes( "", 1, PER_PAGE, tag),
});
return (
    <HydrationBoundary state={dehydrate(qc)}>
        <NotesClient tag={tag}/>
    </HydrationBoundary>
)
}