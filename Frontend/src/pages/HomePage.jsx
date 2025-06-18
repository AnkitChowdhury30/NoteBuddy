import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import RateLimitedUI from '../components/RateLimitedUI'
import toast from "react-hot-toast"
import NoteCard from '../components/NoteCard'

const HomePage = () => {
  const [isRateLimited,setIsRateLimited] = useState(false);
  const [notes,setNotes]= useState([]);
  const [loading,setLoading]=useState(true);
  
  useEffect(()=>{
    const fetchNotes = async ()=>{
      try {
        const res = await fetch("http://localhost:5001/api/notes");
        const data= await res.json();
        setNotes(data);
        console.log(data);
        if(res.status=== 429){
          setIsRateLimited(true);
        }

      } catch (error) {
        console.log("Error in fetching notes");
        console.log(error.response)
        
        
      }
      finally{
        setLoading(false);
      }
    };
    fetchNotes();
  },[])

  const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this note?")) return;

  try {
    const res = await fetch(`http://localhost:5001/api/notes/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Failed to delete");
    setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));

    toast.success("Note deleted successfully!");
  } catch (error) {
    console.error("Error deleting note:", error);
    toast.error("Something went wrong while deleting");
  }
};


  return (

    <div className='min-h-screen bg-purple-950'>
      <Navbar/>  
      {isRateLimited && <RateLimitedUI/>}
      <div className='max-w-7xl mx-auto p-4 mt-6'>
        {loading && <div className='text-center text-primary py-10'>Loading notes...</div>}
        {notes.length>0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-6">
          {notes.map(note=>(
            <NoteCard key={note._id} note={note} onDelete={handleDelete}/>
          ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage

