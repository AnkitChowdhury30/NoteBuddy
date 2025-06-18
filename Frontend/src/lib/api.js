const BASE_URL =import.meta.env.MODE==="development"? "http://localhost:5001/api":"/api"
export async function createNote({ title, content }) {
  try {
    const res = await fetch(`${BASE_URL}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    });

    return res;
  } catch (error) {
    throw error;
  }
}

// api.js
export async function getNotes() {
  return await fetch(`${BASE_URL}/notes/`, {
    method: "GET",
  });
}
export async function deleteNote(id) {
  return await fetch(`${BASE_URL}/notes/${id}`, {
    method: "DELETE",
  });
}

export async function getNoteById(id) {
  return await fetch(`${BASE_URL}/notes/${id}`,{
    method:"GET",
  })
  
}

export async function updateNote(id){
  return await fetch(`${BASE_URL}/notes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
      });
}