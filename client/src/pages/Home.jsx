import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { PostContext } from "../contexts/PostContext";
import { AuthContext } from "../contexts/AuthContext";
import { FaThumbsUp, FaComment, FaShare, FaEllipsisH, FaSmile, FaPaperclip } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { RiHeartAddFill, RiEarthFill } from "react-icons/ri";
import { BsEmojiSmile, BsThreeDots } from "react-icons/bs";
import { HiPhotograph } from "react-icons/hi";

export default function Home() {
  const { posts, loadingPosts, createPost } = useContext(PostContext);
  const { userData } = useContext(AuthContext);
  const [expandedComments, setExpandedComments] = useState({});
  const [commentText, setCommentText] = useState("");
  const [activeReaction, setActiveReaction] = useState({});
  const [showReactions, setShowReactions] = useState({});
  const [postContent, setPostContent] = useState("");
  const [postVisibility, setPostVisibility] = useState("public");
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  const reactions = [
    { name: "Like", icon: "👍", color: "text-blue-600" },
    { name: "Celebrate", icon: "🎉", color: "text-yellow-500" },
    { name: "Support", icon: "❤️", color: "text-red-500" },
    { name: "Love", icon: "😍", color: "text-pink-500" },
    { name: "Insightful", icon: "💡", color: "text-purple-500" },
    { name: "Curious", icon: "🤔", color: "text-green-500" }
  ];

  const toggleComments = (postId) => {
    setExpandedComments(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const handleAddComment = (postId) => {
    if (!commentText.trim()) return;
    console.log(`Adding comment to post ${postId}:`, commentText);
    setCommentText("");
  };

  const handleReactionHover = (postId) => {
    setShowReactions(prev => ({ ...prev, [postId]: true }));
  };

  const handleReactionLeave = (postId) => {
    setTimeout(() => {
      setShowReactions(prev => ({ ...prev, [postId]: false }));
    }, 500);
  };

  const selectReaction = (postId, reaction) => {
    setActiveReaction(prev => ({ ...prev, [postId]: reaction }));
    setShowReactions(prev => ({ ...prev, [postId]: false }));
  };

  const handleCreatePost = async () => {
    if (!postContent.trim()) return;
    
    try {
      await createPost({
        content: postContent,
        visibility: postVisibility
      });
      setPostContent("");
      setShowCreateModal(false);
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };

  if (loadingPosts) return (
    <div className="flex justify-center mt-20">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0A66C2]"></div>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto mt-2 space-y-4 pb-20">
      {/* Create Post Card */}
      <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
        <div className="flex items-center space-x-3">
          {userData?.avatar ? (
            <img 
              src={userData.avatar} 
              alt={userData.name} 
              className="w-10 h-10 rounded-full object-cover" 
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-600 font-medium">
                {userData?.name?.charAt(0)}
              </span>
            </div>
          )}
          <button 
            onClick={() => setShowCreateModal(true)}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full py-2 px-4 text-left"
          >
            Start a post...
          </button>
        </div>
        <div className="flex justify-between mt-3 text-gray-500">
          <button className="flex items-center space-x-1 px-3 py-1.5 hover:bg-gray-100 rounded-md">
            <HiPhotograph className="text-green-500 text-xl" />
            <span className="text-xs md:text-sm">Media</span>
          </button>
          <button className="flex items-center space-x-1 px-3 py-1.5 hover:bg-gray-100 rounded-md">
            <FaPaperclip className="text-blue-500" />
            <span className="text-xs md:text-sm">Document</span>
          </button>
          <button className="flex items-center space-x-1 px-3 py-1.5 hover:bg-gray-100 rounded-md">
            <RiEarthFill className="text-orange-500" />
            <span className="text-xs md:text-sm">Event</span>
          </button>
        </div>
      </div>

      {/* Posts Feed */}
      {posts.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center border border-gray-200">
          <p className="text-gray-600">No posts yet. Be the first to share something!</p>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="mt-4 bg-[#0A66C2] text-white px-4 py-2 rounded-full hover:bg-[#004182] transition-colors"
          >
            Create Post
          </button>
        </div>
      ) : (
        posts.map((post) => (
          <div key={post._id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
            {/* Post Header */}
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Link to={`/profile/${post?.author?._id}`}>
                    {post?.author?.avatar ? (
                      <img 
                        src={post.author.avatar} 
                        alt={post.author.name} 
                        className="w-10 h-10 rounded-full object-cover" 
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-600">
                          {post?.author?.name?.charAt(0)}
                        </span>
                      </div>
                    )}
                  </Link>
                  <div>
                    <Link 
                      to={`/profile/${post?.author?._id}`} 
                      className="font-semibold hover:underline text-gray-900"
                    >
                      {post?.author?.name}
                    </Link>
                    <p className="text-xs text-gray-500 flex items-center">
                      {new Date(post?.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}
                      <span className="mx-1">•</span>
                      <RiEarthFill className="text-gray-500 mr-1" />
                      <span>Public</span>
                    </p>
                  </div>
                </div>
                <button className="text-gray-500 hover:bg-gray-100 p-1 rounded-full">
                  <BsThreeDots className="text-lg" />
                </button>
              </div>

              {/* Post Content */}
              <p className="mt-3 text-gray-800 text-sm md:text-base">{post?.content}</p>
            </div>

            {/* Post Stats */}
            <div className="px-4 py-2 border-t border-b border-gray-100 text-sm text-gray-500 flex items-center justify-between">
              <div className="flex items-center space-x-1">
                <div className="flex items-center">
                  <span className="bg-blue-600 text-white rounded-full p-0.5 flex items-center justify-center w-5 h-5 text-xs">
                    👍
                  </span>
                  <span className="bg-red-500 text-white rounded-full p-0.5 flex items-center justify-center w-5 h-5 text-xs -ml-1">
                    ❤️
                  </span>
                </div>
                <span>42</span>
              </div>
              <div className="flex space-x-2">
                <span>24 comments</span>
                <span>•</span>
                <span>5 shares</span>
              </div>
            </div>

            {/* Post Actions */}
            <div className="flex justify-between px-2 py-1 text-gray-500 text-sm relative">
              <button 
                className={`flex items-center justify-center w-full py-2 rounded-md hover:bg-gray-100 ${
                  activeReaction[post._id] ? activeReaction[post._id].color : ''
                }`}
                onMouseEnter={() => handleReactionHover(post._id)}
                onMouseLeave={() => handleReactionLeave(post._id)}
              >
                {activeReaction[post._id] ? (
                  <span className="mr-1 text-lg">{activeReaction[post._id].icon}</span>
                ) : (
                  <FaThumbsUp className="mr-1" />
                )}
                <span>{activeReaction[post._id]?.name || 'Like'}</span>
                
                {/* Reaction Selector */}
                {showReactions[post._id] && (
                  <div 
                    className="absolute bottom-full mb-2 bg-white shadow-lg rounded-full px-2 py-1 flex space-x-1 border border-gray-200"
                    onMouseEnter={() => setShowReactions(prev => ({ ...prev, [post._id]: true }))}
                    onMouseLeave={() => setShowReactions(prev => ({ ...prev, [post._id]: false }))}
                  >
                    {reactions.map((reaction, idx) => (
                      <button
                        key={idx}
                        className="text-2xl hover:scale-125 transition-transform"
                        onClick={() => selectReaction(post._id, reaction)}
                        title={reaction.name}
                      >
                        {reaction.icon}
                      </button>
                    ))}
                  </div>
                )}
              </button>
              
              <button 
                className="flex items-center justify-center w-full py-2 rounded-md hover:bg-gray-100"
                onClick={() => toggleComments(post._id)}
              >
                <FaComment className="mr-1" />
                <span>Comment</span>
              </button>
              
              <button className="flex items-center justify-center w-full py-2 rounded-md hover:bg-gray-100">
                <FaShare className="mr-1" />
                <span>Share</span>
              </button>
            </div>

            {/* Comments Section */}
            {expandedComments[post._id] && (
              <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
                {/* Existing Comments */}
                <div className="space-y-3 mb-3 max-h-60 overflow-y-auto">
                  {[1, 2, 3].map((comment) => (
                    <div key={comment} className="flex space-x-2">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                          <span className="text-gray-600">U</span>
                        </div>
                      </div>
                      <div className="bg-gray-100 p-3 rounded-2xl flex-1">
                        <div className="flex justify-between">
                          <p className="font-semibold text-sm">John Doe</p>
                          <span className="text-xs text-gray-500">2h</span>
                        </div>
                        <p className="text-sm mt-1">This is a sample comment on the post</p>
                        <div className="flex space-x-3 mt-2 text-xs text-gray-500">
                          <button className="hover:underline">Like</button>
                          <button className="hover:underline">Reply</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Comment */}
                <div className="flex space-x-2">
                  {userData?.avatar ? (
                    <img 
                      src={userData.avatar} 
                      alt={userData.name} 
                      className="w-8 h-8 rounded-full object-cover flex-shrink-0" 
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                      <span className="text-gray-600">
                        {userData?.name?.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div className="flex-1 flex bg-white border border-gray-300 rounded-full overflow-hidden">
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      className="flex-1 px-3 py-1.5 text-sm focus:outline-none"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                    />
                    <button className="px-3 text-gray-500 hover:text-gray-700">
                      <BsEmojiSmile className="text-lg" />
                    </button>
                    <button 
                      className="px-3 text-blue-500 hover:text-blue-700"
                      onClick={() => handleAddComment(post._id)}
                      disabled={!commentText.trim()}
                    >
                      <FiSend className="text-lg" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))
      )}

      {/* Create Post Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-md shadow-xl">
            <div className="p-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-lg text-gray-800">Create a post</h3>
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-start space-x-3 mb-4">
                {userData?.avatar ? (
                  <img 
                    src={userData.avatar} 
                    alt={userData.name} 
                    className="w-10 h-10 rounded-full object-cover" 
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-600 font-medium">
                      {userData?.name?.charAt(0)}
                    </span>
                  </div>
                )}
                <div>
                  <p className="font-medium text-gray-900">{userData?.name}</p>
                  <div className="flex items-center mt-1">
                    <button className="flex items-center text-xs text-gray-600 border border-gray-300 rounded-full px-2 py-1">
                      <RiEarthFill className="mr-1" />
                      <span>Anyone</span>
                    </button>
                  </div>
                </div>
              </div>
              
              <textarea
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                placeholder="What do you want to talk about?"
                className="w-full h-32 border-none focus:outline-none resize-none text-lg"
              />
              
              <div className="flex items-center justify-between mt-4">
                <button className="text-gray-500 hover:bg-gray-100 p-2 rounded-full">
                  <HiPhotograph className="text-xl text-green-500" />
                </button>
                <div className="flex items-center space-x-2">
                  <button className="text-gray-500 hover:bg-gray-100 p-2 rounded-full">
                    <BsEmojiSmile className="text-xl" />
                  </button>
                  <button className="text-gray-500 hover:bg-gray-100 p-2 rounded-full">
                    <FaPaperclip className="text-xl" />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-200">
              <button
                onClick={handleCreatePost}
                disabled={!postContent.trim()}
                className={`w-full py-2.5 rounded-full font-medium ${
                  postContent.trim() 
                    ? "bg-[#0A66C2] hover:bg-[#004182] text-white"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}