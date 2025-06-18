import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import { createNote } from "../lib/api.js"; // ✅ Import from your api.js

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      const response = await createNote({ title, content });

      if (response.status === 429) {
        toast.error("Slow down! You're creating notes too fast", {
          duration: 4000,
          icon: "💀",
        });
      } else if (!response.ok) {
        toast.error("Failed to create note");
      } else {
        toast.success("Note created successfully!");
        navigate("/");
      }
    } catch (error) {
      console.error("Error creating note:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-purple-950 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <Link to="/" className="flex items-center text-yellow-200 hover:underline mb-6">
          <ArrowLeftIcon className="w-5 h-5 mr-1" />
          Back to Notes
        </Link>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-6">Create New Note</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">Title</label>
              <input
                type="text"
                placeholder="Note Title"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-1">Content</label>
              <textarea
                placeholder="Write your note here..."
                className="w-full border border-gray-300 rounded-md p-2 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className={`px-5 py-2 rounded-md text-white font-medium ${
                  loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                }`}
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Note"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
