const asyncHandler = require('express-async-handler');
const Post = require('../models/Post');

exports.createPost = asyncHandler(async (req, res) => {
    const { content } = req.body;

    if (!content?.trim()) {
        res.status(400);
        throw new Error('Post content cannot be empty');
    }

    const post = await Post.create({
        content: content.trim(),
        author: req.user._id,
        likes: [],
        comments: []
    });

    await post.populate('author', 'name avatar');

    res.status(201).json(post);
});


exports.getAllPosts = asyncHandler(async (req, res) => {
    const posts = await Post.find()
        .populate('author', 'name avatar headline')
        .populate('comments.author', 'name avatar')
        .sort({ createdAt: -1 });

    const transformedPosts = posts.map(post => ({
        ...post.toObject(),
        likesCount: post.likes.length,
        commentsCount: post.comments.length,
        isLiked: req.user ? post.likes.some(id => id.equals(req.user._id)) : false
    }));

    res.status(200).json(transformedPosts);
});


exports.toggleLike = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (!post) {
        res.status(404);
        throw new Error('Post not found');
    }

    const userId = req.user._id;
    const likeIndex = post.likes.findIndex(id => id.equals(userId));

    if (likeIndex === -1) {
        post.likes.push(userId);
    } else {
        post.likes.splice(likeIndex, 1);
    }

    await post.save();

    res.status(200).json({
        success: true,
        likesCount: post.likes.length,
        isLiked: likeIndex === -1
    });
});


exports.addComment = asyncHandler(async (req, res) => {
    const { text } = req.body;

    if (!text?.trim()) {
        res.status(400);
        throw new Error('Comment text is required');
    }

    const post = await Post.findById(req.params.id);
    if (!post) {
        res.status(404);
        throw new Error('Post not found');
    }

    const newComment = {
        text: text.trim(),
        author: req.user._id,
        createdAt: new Date()
    };

    post.comments.push(newComment);
    await post.save();

    await post.populate('comments.author', 'name avatar');

    res.status(201).json({
        success: true,
        comment: post.comments[post.comments.length - 1]
    });
});


exports.getPost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id)
        .populate('author', 'name avatar')
        .populate('comments.author', 'name avatar');

    if (!post) {
        res.status(404);
        throw new Error('Post not found');
    }

    res.status(200).json({
        ...post.toObject(),
        likesCount: post.likes.length,
        isLiked: req.user ? post.likes.some(id => id.equals(req.user._id)) : false
    });
});

