import { useEffect, useState } from "react";
import axios from "../api/api";
import { motion } from "framer-motion";
import {
  EnvelopeIcon,
  UserIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  MapPinIcon,
  PencilIcon,
  ArrowPathIcon,
  HeartIcon,
  ChatBubbleLeftIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("posts");
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    name: "",
    headline: "",
    bio: "",
    location: "",
    skills: "",
  });

  // Sample skills for editing
  const [newSkill, setNewSkill] = useState("");

  const fetchProfile =  async() => {
    try {
      // Simulate API call with mock data
   
        const res = await axios.get(`/users/profile`);
        setProfile(res.data);
        setLoading(false);
    } catch (err) {
      console.error(err);
      alert("Failed to load profile");
      setLoading(false);

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Here you would typically make an API call to save the updated profile
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !editedProfile.skills.includes(newSkill)) {
      const updatedSkills = editedProfile.skills
        ? `${editedProfile.skills}, ${newSkill.trim()}`
        : newSkill.trim();
      setEditedProfile({ ...editedProfile, skills: updatedSkills });
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    const skillsArray = editedProfile.skills
      .split(", ")
      .filter((skill) => skill !== skillToRemove);
    setEditedProfile({ ...editedProfile, skills: skillsArray.join(", ") });
  };

  const handleInputChange = (e) => {
    setEditedProfile({ ...editedProfile, [e.target.name]: e.target.value });
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#0A66C2]"></div>
      </div>
    );

  if (!profile)
    return (
      <div className="text-center mt-10 text-red-500">
        <div className="bg-red-50 p-4 rounded-lg inline-block">
          <p>User not found. Please try again later.</p>
          <button
            onClick={fetchProfile}
            className="mt-3 flex items-center justify-center gap-2 text-[#0A66C2] hover:underline"
          >
            <ArrowPathIcon className="w-4 h-4" />
            Retry
          </button>
        </div>
      </div>
    );

  const { user, posts, connections, views } = profile;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-10 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto"
      >
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-[#0A66C2] to-[#004182] rounded-t-2xl p-6 text-white">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center text-[#0A66C2] font-bold text-4xl border-4 border-white shadow-lg">
                  {user?.name?.[0]}
                </div>
              )}
              <button
                onClick={handleEditProfile}
                className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md"
              >
                <PencilIcon className="w-5 h-5 text-[#0A66C2]" />
              </button>
            </div>

            <div className="text-center md:text-left">
              <motion.h1
                className="text-3xl font-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={editedProfile.name}
                    onChange={handleInputChange}
                    className="bg-white/10 border border-white/30 rounded-lg px-3 py-2 text-white w-full max-w-xs"
                    placeholder="Full Name"
                  />
                ) : (
                  user?.name
                )}
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-2"
              >
                {isEditing ? (
                  <input
                    type="text"
                    name="headline"
                    value={editedProfile.headline}
                    onChange={handleInputChange}
                    className="bg-white/10 border border-white/30 rounded-lg px-3 py-2 text-white w-full max-w-md"
                    placeholder="Professional Headline"
                  />
                ) : (
                  <p className="text-xl opacity-90">{user?.headline}</p>
                )}
              </motion.div>

              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
                <div className="bg-white/10 px-4 py-2 rounded-lg">
                  <span className="font-bold">{connections}</span> connections
                </div>
                <div className="bg-white/10 px-4 py-2 rounded-lg">
                  <span className="font-bold">{views}</span> profile views
                </div>
                <div className="bg-white/10 px-4 py-2 rounded-lg">
                  <span className="font-bold">{posts?.length || 0}</span> posts
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="bg-white rounded-b-2xl shadow-xl p-6 md:p-8">
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              className={`px-4 py-2 font-medium ${
                activeTab === "posts"
                  ? "text-[#0A66C2] border-b-2 border-[#0A66C2]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("posts")}
            >
              Posts
            </button>
            <button
              className={`px-4 py-2 font-medium ${
                activeTab === "about"
                  ? "text-[#0A66C2] border-b-2 border-[#0A66C2]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("about")}
            >
              About
            </button>
            <button
              className={`px-4 py-2 font-medium ${
                activeTab === "activity"
                  ? "text-[#0A66C2] border-b-2 border-[#0A66C2]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("activity")}
            >
              Activity
            </button>
          </div>

          {/* Profile Details */}
          {activeTab === "about" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Contact Info */}
              <div className="bg-blue-50 rounded-xl p-5">
                <h3 className="text-lg font-bold text-gray-800 mb-3">
                  Contact Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <EnvelopeIcon className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    <span className="text-gray-700">{user?.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPinIcon className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    {isEditing ? (
                      <input
                        type="text"
                        name="location"
                        value={editedProfile.location}
                        onChange={handleInputChange}
                        className="bg-white border border-gray-300 rounded-lg px-3 py-2 w-full max-w-xs"
                        placeholder="Location"
                      />
                    ) : (
                      <span className="text-gray-700">{user?.location}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="bg-blue-50 rounded-xl p-5">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-bold text-gray-800">About</h3>
                  {isEditing && (
                    <span className="text-sm text-gray-500">
                      {editedProfile.bio.length}/500
                    </span>
                  )}
                </div>
                {isEditing ? (
                  <textarea
                    name="bio"
                    value={editedProfile.bio}
                    onChange={handleInputChange}
                    maxLength={500}
                    rows={4}
                    className="bg-white border border-gray-300 rounded-lg w-full p-3"
                    placeholder="Professional bio"
                  />
                ) : (
                  <p className="text-gray-700">{user?.bio}</p>
                )}
              </div>

              {/* Skills */}
              <div className="bg-blue-50 rounded-xl p-5">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-bold text-gray-800">Skills</h3>
                </div>

                {isEditing ? (
                  <div>
                    <div className="flex gap-2 mb-3">
                      <input
                        type="text"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        className="flex-grow bg-white border border-gray-300 rounded-lg px-3 py-2"
                        placeholder="Add a skill"
                      />
                      <button
                        onClick={handleAddSkill}
                        className="bg-[#0A66C2] text-white px-4 rounded-lg hover:bg-[#004182] transition-colors"
                      >
                        Add
                      </button>
                    </div>

                    {editedProfile.skills && (
                      <div className="flex flex-wrap gap-2">
                        {editedProfile.skills
                          .split(", ")
                          .map((skill, index) => (
                            <span
                              key={index}
                              className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                            >
                              {skill}
                              <button
                                onClick={() => handleRemoveSkill(skill)}
                                className="ml-2 text-blue-600 hover:text-blue-900"
                              >
                                ×
                              </button>
                            </span>
                          ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {user?.skills?.map((skill, i) => (
                      <span
                        key={i}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                      >
                        #{skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {isEditing && (
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveProfile}
                    className="px-4 py-2 bg-[#0A66C2] text-white rounded-lg hover:bg-[#004182] shadow-md"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {/* Posts */}
          {activeTab === "posts" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <div className="flex items-start gap-3 mb-4">
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-bold text-lg">
                      {user?.name?.[0]}
                    </div>
                  )}
                  <textarea
                    className="flex-grow border border-gray-300 rounded-lg p-3 min-h-[100px]"
                    placeholder="Share a post..."
                  />
                </div>
                <div className="flex justify-between">
                  <div className="flex gap-2">
                    <button className="text-gray-500 hover:text-blue-600 flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      Media
                    </button>
                    <button className="text-gray-500 hover:text-blue-600 flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Emoji
                    </button>
                  </div>
                  <button className="bg-[#0A66C2] text-white px-4 py-2 rounded-lg hover:bg-[#004182]">
                    Post
                  </button>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-2">Latest Posts</h3>

              {posts?.length === 0 ? (
                <div className="bg-blue-50 rounded-xl p-8 text-center">
                  <AcademicCapIcon className="w-16 h-16 mx-auto text-blue-400" />
                  <p className="text-gray-600 mt-4">
                    No posts yet. Share your first update!
                  </p>
                </div>
              ) : (
                posts.map((post, index) => (
                  <motion.div
                    key={post._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-3 mb-4">
                      {user?.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-bold text-lg">
                          {user?.name?.[0]}
                        </div>
                      )}
                      <div>
                        <div className="font-bold text-gray-800">
                          {user.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(post.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4">{post.content}</p>

                    <div className="flex justify-between border-t border-gray-100 pt-3">
                      <button className="flex items-center gap-1 text-gray-500 hover:text-red-500">
                        <HeartIcon className="w-5 h-5" />
                        <span>{post.likesCount} Likes</span>
                      </button>
                      <button className="flex items-center gap-1 text-gray-500 hover:text-blue-600">
                        <ChatBubbleLeftIcon className="w-5 h-5" />
                        <span>{post.commentsCount} Comments</span>
                      </button>
                      <button className="flex items-center gap-1 text-gray-500 hover:text-green-600">
                        <ShareIcon className="w-5 h-5" />
                        <span>Share</span>
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>
          )}

          {/* Activity */}
          {activeTab === "activity" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="bg-blue-50 rounded-xl p-5">
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  Recent Activity
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <HeartIcon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">You liked John Doe's post</p>
                      <p className="text-sm text-gray-500">2 hours ago</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-green-100 p-2 rounded-full">
                      <ChatBubbleLeftIcon className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">
                        Commented on Sarah Smith's update
                      </p>
                      <p className="text-sm text-gray-500">Yesterday</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-purple-100 p-2 rounded-full">
                      <ShareIcon className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium">
                        Shared an article about React performance
                      </p>
                      <p className="text-sm text-gray-500">3 days ago</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-100 p-2 rounded-full">
                      <BriefcaseIcon className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                      <p className="font-medium">
                        Updated your headline to "{user.headline}"
                      </p>
                      <p className="text-sm text-gray-500">1 week ago</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-5">
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  Achievements
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-blue-800 font-bold">50+</span>
                    </div>
                    <p>Posts Created</p>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-green-800 font-bold">1k+</span>
                    </div>
                    <p>Likes Received</p>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-purple-800 font-bold">5+</span>
                    </div>
                    <p>Skills Mastered</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
