import { Link } from "react-router"
import {PenSquareIcon,Trash2Icon} from "lucide-react"
import { formatDate } from "../lib/utils.js"

const NoteCard = ({note,onDelete}) => {
  return (
    <Link to={`/note/${note._id}`}
       className="p-4 bg-purple-500 rounded-2xl bg-base-100 hover:shadow-lg transition-all duration-200 
      border-t-4 border-solid border-[#00FF9D] ">
        <div className="">
          <h3 className="text-based-content"> 
            {note.title}
          </h3>
          <p className="text-base-content/70 line-clamp-3">
            {note.content}
          </p>
          <div className="justify-between items-center mt-4">
            <span className="text-sm text-base-content/60">
              {formatDate(note.createdAt)}
            </span>
            <div className="flex items-center gap-1 justify-between">
                <PenSquareIcon className="size-5 "/>
                {/* <button className="text-red cursor-pointer" onClick={(e)=>handleDelete(e,note._id)}> */}
                <button className="text-red cursor-pointer" onClick={(e)=>{e.preventDefault();onDelete(note._id)}}>
                  <Trash2Icon className="size-5"/>
                </button>
            </div>
          </div>
        </div>
    </Link>
  )
}

export default NoteCard


