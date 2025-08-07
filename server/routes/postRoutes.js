const express = require('express');
const {
  createPost,
  getAllPosts,
  getUserProfile,
  toggleLike,
  getPost,
  addComment
} = require('../controllers/postController');

const protect = require('../middlewares/authMiddleware');
const router = express.Router();

// Create a post
router.post('/create', protect, createPost);

// Get all posts
router.get('/all', protect, getAllPosts);

// Get a single post by ID
router.get('/:id', protect, getPost);

// Toggle like/unlike on a post
router.patch('/:id/like', protect, toggleLike);

// Add a comment to a post
router.post('/:id/comments', protect, addComment);


module.exports = router;
