import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeNote } from "../redux/noteSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Calendar, Copy, Eye, PencilLine, Trash2, Share2 } from "lucide-react";
import {FormatDate} from "./FormatDate"
const Allnotes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Selector to get notes from redux state; default to empty array
  const notes = useSelector((state) => state.note?.notes ?? []);

  // Local state for search input
  const [search, setSearch] = useState("");

  // Handler to delete a note by _id
  const handleDelete = (id) => {
    dispatch(removeNote(id));
    toast.success("Note deleted successfully!");
  };

  const getRandomColor = () => {
    const hue = Math.floor(Math.random() * 360);
    const saturation = 40;   // lower saturation for matte
    const lightness = 45;    // lower lightness for muted look
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  // Filter notes by search term (case-insensitive)
  const filteredData = notes.filter((note) =>
    note.title?.toLowerCase().includes(search.toLowerCase())
  );


  const createdAt = new Date(Date.now()); // or use a dynamic value

  const formatted = createdAt.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const formattedTime = createdAt.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  return (
    <div className="flex flex-col gap-5 mt-4">
      <div>
        <input
          id="searchNotes"
          type="search"
          placeholder="Type to search notes by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-gray p-4 w-[500px] rounded-2xl h-[40px] border-2 border-red-600 outline-none text-white-700"
        />
      </div>

      <div className="flex flex-col gap-4 ">
        <div>
          <strong className="text-[#FFB86C]">Total notes in store: {notes.length}</strong>
          <br />
          <strong className="text-[#FFB86C]">Notes matching search: {filteredData.length}</strong>
        </div>
        <div className="border border-white bg-[#242424] text-white p-4 rounded-md gap-4
        flex flex-col w-[550px]">
        <h1 className="text-[#FFD700]">All Your Notes</h1>

        {filteredData.length > 0 ? (
          filteredData.map((note) => (
            <div
              key={note._id}
              
            >
                <div className={`border border-white text-[#FFFFFF] p-4 rounded-md gap-4
        flex flex-col`} style={{ backgroundColor: getRandomColor() }}>
                  <h3 className="text-left text-2xl font-extrabold">{note?.title || "(No Title)"}</h3>
                  <p className="text-left text-md font-light text-[#F5F5F5]">{note?.content || "(No Content)"}</p>
                

              <div className="flex justify-around mt-6 ">
                {/* Edit button navigates programmatically */}
                <button
                  onClick={() => navigate(`/?noteId=${note._id}`)}
                  className="bg-[#FFFFFF] transition delay-50 duration-200 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-[#F2C6B9] rounded-md hover:rounded-s-full"
                >
                  <PencilLine
                    className="text-[#222222] group-hover:text-blue-500"
                    size={20}
                  />
                </button>

                {/* View opens in route */}
                <button onClick={() => navigate(`/all-notes/${note._id}`)} className="bg-[#FFFFFF] transition delay-50 duration-200 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-[#F2C6B9] rounded-md hover:rounded-s-full">
                  <Eye
                    className="text-[#222222] group-hover:text-orange-500"
                    size={20}
                  />
                </button>

                {/* Delete */}
                <button
                  onClick={() => handleDelete(note._id)}
                  className="bg-[#FFFFFF] transition delay-50 duration-200 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-[#F2C6B9] rounded-md"
                >
                  <Trash2
                    className="text-[#222222] group-hover:text-pink-500"
                    size={20}
                  />
                </button>

                {/* Share button placeholder, implement as needed */}
                <button
                  className="bg-[#FFFFFF] transition delay-50 duration-200 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-[#F2C6B9] rounded-md hover:rounded-e-full"
                  onClick={() => {
                    if (navigator.share) {
                      const shareData = {
                        title: note.title || "(No Title)",
                        text: note.content || "(No Content)",
                        url: window.location.href, // Optional: current page link
                      };
                      navigator
                        .share(shareData)
                        .then(() => {
                          toast.success("Note shared successfully!");
                        })
                        .catch((err) => {
                          toast.error("Failed to share note.");
                          console.error(err);
                        });
                    } else {
                      toast.error(
                        "Web Share API not supported on this browser"
                      );
                    }
                  }}
                >
                  <Share2
                    className="text-[#222222] group-hover:text-orange-500"
                    size={20}
                  />
                </button>

                {/* Copy content to clipboard */}
                <button className="bg-[#FFFFFF] transition delay-50 duration-200 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-[#F2C6B9] rounded-md hover:rounded-e-full"
                  onClick={() => {
                    if (note.content) {
                      navigator.clipboard.writeText(note.content);
                      toast.success("Note copied to clipboard!");
                    } else {
                      toast.error("No content to copy");
                    }
                  }}
                >
                  <Copy
                    className="text-[#222222] group-hover:text-green-500"
                    size={20}
                  />
                </button>
              </div>

              <div
                className="flex justify-start gap-2"
              >
                <Calendar />
                {FormatDate(note?.createdAt)}
              </div>
            </div>
            </div>
          ))
        ) : (
          <p>No notes found matching your search.</p>
        )}
        
        </div>
      </div>
    </div>
  );
};

export default Allnotes;
