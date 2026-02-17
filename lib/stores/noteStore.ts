import { create } from 'zustand';
import { CreateNote } from '../api';
import { persist } from 'zustand/middleware';

interface newDraftStore {
  draft :CreateNote;
  setDraft:(draft:CreateNote)=> void;
  clearDraft:()=> void;
}
const initialDraft: CreateNote = {
  title: '',
  content: '',
  tag: 'Todo',
};

export const useNoteDraftStore = create<newDraftStore>()(
  persist(
  (set)=>({
    draft: initialDraft,
    setDraft: (note) => set(() => ({draft : note})),
    clearDraft:() => set(() => ({draft : initialDraft})),}),
     {name: 'note-draft',
       partialize: (state) => ({ draft: state.draft }),
     }
));