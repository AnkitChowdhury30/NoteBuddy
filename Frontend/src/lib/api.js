const BASE_URL = "http://localhost:5001/api"; // Change this to your actual backend URL if needed

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