import NotePreviewClient from "./NotePreview.client"
import { fetchNoteById } from "@/lib/api";
import { dehydrate, QueryClient, HydrationBoundary, } from "@tanstack/react-query";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function NoteModalPage({ params } : Props){
 const { id } = await params;
  const qc = new QueryClient();
  await qc.prefetchQuery({
    queryKey:["note", id],
    queryFn :()=> fetchNoteById(id),
  })
  return ( <HydrationBoundary state ={dehydrate(qc)}>
<NotePreviewClient id ={id} />
  </HydrationBoundary>)
}