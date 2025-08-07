const asyncHandler = require('express-async-handler');
const Post = require('../models/Post');
const User = require('../models/User');

exports.globalSearch = asyncHandler(async (req, res) => {
  const { q: query, type } = req.query;
  const userId = req.user._id;

  if (!query?.trim()) {
    return res.status(400).json({ error: "Search query is required" });
  }

  const results = {};

  // User Search (Name/Headline)
  if (!type || type === 'users') {
    results.users = await User.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { headline: { $regex: query, $options: 'i' } }
      ],
      _id: { $ne: userId } // Exclude current user
    }).select('name avatar headline connectionsCount').limit(5);
  }

  // Post Search (Content)
  if (!type || type === 'posts') {
    results.posts = await Post.find({
      content: { $regex: query, $options: 'i' }
    })
      .populate('author', 'name avatar')
      .limit(5);
  }

  // Hashtag Search (Example: #jobs)
  if (!type || type === 'hashtags') {
    results.hashtags = await Post.aggregate([
      { $match: { content: { $regex: `#${query}`, $options: 'i' } } },
      { $group: { _id: null, count: { $sum: 1 } } }
    ]);
  }

  res.json({ success: true, results });
});