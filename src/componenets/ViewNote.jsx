import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ViewNote = () => {
  const { id } = useParams();

  console.log(id)

  const notes = useSelector((state) => state.note.notes);

  // Filter pastes based on search term (by title or content)
  const note = notes.filter((note) => note._id === id)[0];

  console.log("Note->",note);
  return (
    <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0">
      <div className="flex flex-col gap-y-5 items-start pl-3">
        <input
          type="text"
          placeholder="Title"
          value={note.title}
          disabled
          className="w-full border border-input rounded-md p-3 font-bold text-lg text-[#A8FF60]"
        />
        <div
          className={`w-full flex flex-col items-start relative rounded bg-opacity-10 border border-[rgba(128,121,121,0.3)] backdrop-blur-2xl`}
        >
          {/* TextArea */}
          <textarea
            value={note.content}
            disabled
            placeholder="Write Your Content Here...."
            className="w-full p-3  focus-visible:ring-0 text-[#66CCFF]"
            rows={20} cols={100}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewNote;
