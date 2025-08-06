const asyncHandler = require('express-async-handler');
const Post = require('../models/Post');
const User = require('../models/User');

exports.createPost = asyncHandler( async (req, res) => {
        const post = await Post.create({
            content: req.body.content,
            author: req.user.id
        });
        res.status(201).json(post);
})
exports.getAllPosts = asyncHandler(async (req, res) => {
    const posts = await Post.find()
        .populate('author', 'name')
        .sort({ createdAt: -1 });

    res.status(200).json(posts);
});

exports.getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }
    

    const posts = await Post.find({ author: req.params.id })
        .sort({ createdAt: -1 });

    res.status(200).json({ user, posts });
});
