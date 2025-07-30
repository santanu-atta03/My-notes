import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToNote, updateNote } from "../redux/noteSlice";

const Home = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParam, setSearchParam] = useSearchParams("");
  const noteId = searchParam.get("noteId");
  const notes = useSelector((state) => state.note?.notes ?? []);

  function createNote() {
    const note = {
      title: title,
      content: value,
      _id:
        noteId ||
        Date.now().toString(36) + Math.random().toString(36).substring(2),
      createdAt: new Date().toISOString(),
    };
    if (noteId) {
      dispatch(updateNote(note));
    } else {
      dispatch(addToNote(note));
    }

    setTitle("");
    setValue("");
    setSearchParam({});
  }

  useEffect(() => {
    if (noteId) {
      const note = notes.find((n) => n._id === noteId);
      if (note) {
        setTitle(note.title);
        setValue(note.content);
      }
    }
  }, [noteId, notes]);

  return (
    <div className="mt-7 flex flex-col gap-4">
      <div className="flex justify-start gap-7">
        <input
          type="text"
          name=""
          id=""
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-[360px] pl-3 rounded-sm text-[#A8FF60] font-bold"
        />
        <button onClick={createNote} className="pl-3 bg-blue-500 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 rounded-md">
          {noteId ? "Update Note" : "Add Note"}
        </button>
      </div>
      <div className="mt-4">
        <textarea
          name=""
          id=""
          value={value}
          placeholder="Enter your note here"
          onChange={(e) => setValue(e.target.value)}
          rows={16}
          cols={95}
          className="p-5 text-[#66CCFF]"
        ></textarea>
      </div>
    </div>
  );
};

export default Home;
