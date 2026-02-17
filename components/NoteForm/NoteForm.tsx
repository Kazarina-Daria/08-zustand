"use client";

import { useNoteDraftStore } from '@/lib/stores/noteStore';
import css from "./NoteForm.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote, type CreateNote } from "../../lib/api";
import { useRouter } from 'next/navigation';
import { redirect } from 'next/dist/server/api-utils';


const initialValues: CreateNote = {
  title: "",
  content: "",
  tag: "Todo",
};


export default function NoteForm() {
  const queryClient = useQueryClient();
    const router = useRouter();
   const { draft, setDraft, clearDraft } = useNoteDraftStore();
  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["note"] });
    },
  });

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  setDraft({
    ...draft,
    [e.target.name]: e.target.value,
  })
}
const {mutate}= useMutation({
  mutationFn : createNote,
  onSuccess: () => {
    clearDraft();
    router.push("/notes/filter/all");
  }
})

  const handleSubmit = (formData : FormData ) => {
    const values = Object.fromEntries(formData) as unknown as CreateNote;
    mutation.mutate(values);
  };
  const  handleCancel = () => {
 router.back();
  }
  return (
      <form className={css.form} action={handleSubmit}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <input id="title" type="text" name="title" className={css.input} defaultValue={draft?.title} onChange={handleChange}/>
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            rows={8}
            className={css.textarea}
            defaultValue={draft?.content}
            onChange={handleChange}
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>
          <select id="tag" name="tag" className={css.select} defaultValue={draft?.tag} onChange={handleChange}>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </select>
        </div>

        <div className={css.actions}>
          <button type="button" className={css.cancelButton} onClick={handleCancel}>
            Cancel
          </button>
          <button
            type="submit"
            className={css.submitButton}
            disabled={mutation.isPending}
         
          >
            Create note
          </button>
        </div>
      
    </form>
  );
}