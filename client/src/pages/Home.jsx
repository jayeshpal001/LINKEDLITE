import { Link } from "react-router-dom";
import { PostContext } from "../contexts/PostContext";
import { useContext } from "react";

export default function Home() {
  const { posts, loadingPosts } = useContext(PostContext);

  if (loadingPosts) return <div className="text-center mt-10">Loading posts...</div>;

  return (
    <div className="max-w-2xl mx-auto mt-8 space-y-4">
      {posts.length === 0 ? (
        <p className="text-center text-gray-600">No posts yet.</p>
      ) : (
        posts.map((post) => (
          <div key={post._id} className="bg-white p-4 rounded shadow">
            <div className="flex justify-between items-center">
              <Link to={`/profile/${post?.author?._id}`} className="font-semibold text-blue-600">
                {post?.author?.name}
              </Link>
              <span className="text-sm text-gray-500">
                {new Date(post?.createdAt).toLocaleString()}
              </span>
            </div>
            <p className="mt-2">{post?.content}</p>
          </div>
        ))
      )}
    </div>
  );
}
