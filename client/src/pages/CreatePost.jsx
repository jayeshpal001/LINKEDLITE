import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PostContext } from "../contexts/PostContext";


export default function CreatePost() {
  const [content, setContent] = useState("");
  const { createPost } = useContext(PostContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return alert("Post content is empty!");
    try {
      await createPost(content);
      navigate("/");
    } catch {
      alert("Failed to create post");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Create a Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          rows={5}
          className="input"
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit" className="btn">Post</button>
      </form>
    </div>
  );
}
