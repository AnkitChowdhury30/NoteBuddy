import Note from "../models/Note.js"
export async function getAllNotes(_,res){
 try {
  const notes = await Note.find().sort({createdAt:-1});// mtlb new notes pahele aane chiaye
  res.status(200).json(notes);
 } catch (error) {
  console.error("error in getting notes in getAllNotes controller");
  res.status(500).json({message:"Internal server error"});
 }
};
export async function getNoteById(req,res){
 try {
  const notes = await Note.findById(req.params.id);
  if(!notes) return res.status(404).json({message:"Note Note found"});
  res.status(200).json(notes);
 } catch (error) {
  console.error("error in getting notes by id in getNoteById controller");
  res.status(500).json({message:"Internal server error"});
 }
};


export async function createNotes (req,res){
  try{
  const {title,content} = req.body;
  const note=new Note({title,content});
  const savedNote=await note.save();
  
  res.status(201).json(savedNote);
  }
  catch(error){
    console.error("error in creating notes in createNotes controller");
    res.status(500).json({message:"Internal server error"});
  }
}

export async function updateNotes (req,res){
  try {
    const {title,content}=req.body;
    const updatedNote=await Note.findByIdAndUpdate(req.params.id,{title,content},{
      new:true, // gives new updatednote ka content on updated note variable
    });
    if(!updatedNote){
      return res.status(404).json({message:"Note not found",});
    }

    res.status(200).json({message:"Note updated successfully!",updatedNote});
  } catch (error) {
    console.error("error in updating notes in updateNotes controller");
    res.status(500).json({message:"Internal server error"});
  }
}


export async function deleteNotes(req,res){
  try {
    const deletedNote=await Note.findByIdAndDelete(req.params.id);
    if(!deletedNote){
     return res.status(404).json({message:"Note not found",}); 
    }
    res.status(200).json({message:"Note deleted successfully!"});
  } catch (error) {
    console.error("error in deleting notes in deleteNote controller");
    res.status(500).json({message:"Internal server error"});
  }
}