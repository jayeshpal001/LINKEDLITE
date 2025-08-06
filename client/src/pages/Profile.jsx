import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/api";

export default function Profile() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`/posts/user/${id}`);
      setProfile(res.data);
    } catch {
      alert("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [id]);

  if (loading) return <div className="text-center mt-10">Loading profile...</div>;

  if (!profile) return <div className="text-center mt-10 text-red-500">User not found.</div>;

  return (
    <div className="max-w-3xl mx-auto mt-10">
      {/*  User Info */}
      <div className="bg-white p-6 rounded shadow mb-6">
        <h2 className="text-2xl font-bold">{profile.user.name}</h2>
        <p className="text-gray-600">{profile.user.email}</p>
        <p className="mt-2">{profile.user.bio}</p>
      </div>

      {/* User Posts */}
      <div className="space-y-4">
        {profile.posts.length === 0 ? (
          <p className="text-center text-gray-600">No posts yet.</p>
        ) : (
          profile.posts.map((post) => (
            <div key={post._id} className="bg-white p-4 rounded shadow">
              <span className="text-sm text-gray-500">
                {new Date(post.createdAt).toLocaleString()}
              </span>
              <p className="mt-2">{post.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
