import {fetchNotes, NoteTag} from "@/lib/api";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import NotesClient from "./Notes.client";
interface Props {
    params : Promise<{slug?: string[]}> ;
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