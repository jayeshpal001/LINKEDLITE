const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Post = require('../models/Post');

const profile = asyncHandler(async (req, res) => {
  // Check if user is authenticated
  if (!req.user) {
    res.status(401);
    throw new Error("Unauthorized – User not logged in");
  }

  // Get user details (excluding password)
  const user = await User.findById(req.user._id).select("-password");
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Get user's posts with author and comment author populated
  const posts = await Post.find({ author: user._id })
    .populate("author", "name avatar")
    .populate("comments.author", "name avatar")
    .sort({ createdAt: -1 });

  // Prepare posts with metadata
  const formattedPosts = posts.map((post) => ({
    _id: post._id,
    content: post.content,
    createdAt: post.createdAt,
    likesCount: post.likes?.length || 0,
    commentsCount: post.comments?.length || 0,
    author: post.author,
    comments: post.comments,
  }));

  // Send combined user and posts data
  res.status(200).json({
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      bio: user.bio || "",
      headline: user.headline || "",
      skills: user.skills || [],
      location: user.location || "",
      avatar: user.avatar || "",
      isVerified: user.isVerified || false,
      createdAt: user.createdAt,
    },
    posts: formattedPosts,
  });
});

module.exports = profile;
