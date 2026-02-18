"use client";

import css from "./Notes.client.module.css";
import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import { fetchNotes } from "../../../../lib/api";
import NoteList from "../../../../components/NoteList/NoteList";
import SearchBox from "../../../../components/SearchBox/SearchBox";
import Pagination from "../../../../components/Pagination/Pagination";
import {useRouter } from "next/navigation";
import type {NoteTag} from "@/lib/api";


interface NotesClientProps {
  tag?: NoteTag | "all"; 
}

export default function NotesClient({tag}: NotesClientProps) {
  const [onQuery, setOnQuery] = useState("");
  const [searchInputValue, setSearchInputValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const router = useRouter();
 
  const { data, isSuccess, isLoading, isError } = useQuery({
    queryKey: ["notes", currentPage, onQuery, tag],
    queryFn: () => fetchNotes(onQuery, currentPage, 12, tag),
    placeholderData: keepPreviousData,
  });
  const totalPages = data?.totalPages;

  const onFound = useDebouncedCallback((value: string) => {
    setOnQuery(value);
    setCurrentPage(1);
  }, 250);
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <button className={css.button} onClick={() => router.push("/notes/action/create")}>
          Create note +
        </button>
        <SearchBox
          value={searchInputValue}
          onChange={(value) => {
            setSearchInputValue(value);
            onFound(value);
          }}
        />
        {data && data.totalPages !== undefined && (
          <Pagination
            pageCount={totalPages ?? 0}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
      </header>
      {isSuccess && data.notes.length === 0 && (
        <div>Create your first note</div>
      )}
      {isLoading && <p>Loading, please wait...</p>}
      {isError && <p>Something went wrong.</p>}
      {isSuccess && (data?.notes?.length ?? 0) > 0 && (
        <NoteList notes={data.notes} />
      )}
    </div>
  );
}
