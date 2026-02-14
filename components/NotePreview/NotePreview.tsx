"use client";

import { fetchNoteById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import styles from "./NotePreview.module.css";

export default function NotePreview({ id }: { id: string }) {
  const router = useRouter();
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    enabled: !!id,
    retryOnMount: false,
    retryDelay: (attempt) => Math.min(attempt > 2 ? 2 ** attempt : 1000, 10000),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  if (isLoading || isFetching) return <div>Loading...</div>;
  if (error && !data) return <div>Error loading note</div>;

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <button className={styles.backBtn} onClick={() => router.back()}>
          Get back to notes
        </button>
      </div>
      <div className={styles.header}>
        <h2>{data?.title}</h2>
        <span className={styles.tag}>{data?.tag}</span>

        <p className={styles.content}>{data?.content}</p>
        <p className={styles.date}>{data?.createdAt}</p>
        {isFetching ? <p>Updating...</p> : null}
      </div>
    </div>
  );
}
