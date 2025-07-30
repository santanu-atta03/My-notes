import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';
const initialState = {
  notes: localStorage.getItem("notes") ? JSON.parse(localStorage.getItem("notes")) : [],
};

export const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    addToNote: (state, action) => {
      const note = action.payload;
      const index = state.notes.findIndex((n) => n._id === note._id);
      if (index >= 0) {
        toast.error("Note already exists!");
        return;
      }
      state.notes.push(note);
      localStorage.setItem("notes", JSON.stringify(state.notes));
      toast.success("Note added successfully!");
    },
    updateNote: (state, action) => {
      const note = action.payload;
      const index = state.notes.findIndex((n) => n._id === note._id);
      if (index >= 0) {
        state.notes[index] = note;
        localStorage.setItem("notes", JSON.stringify(state.notes));
        toast.success("Note updated successfully!");
      } else {
        toast.error("Note not found!");
      }
    },
    resetAllNotes: (state) => {
      state.notes = [];
      localStorage.removeItem("notes");
    },
    removeNote: (state, action) => {
      const noteId = action.payload;
      const index = state.notes.findIndex((n) => n._id === noteId);
      if (index >= 0) {
        state.notes.splice(index, 1);
        localStorage.setItem("notes", JSON.stringify(state.notes));
      } else {
        toast.error("Note not found!");
      }
    },
  },
});

export const { addToNote, updateNote, resetAllNotes, removeNote } = noteSlice.actions

export default noteSlice.reducer
