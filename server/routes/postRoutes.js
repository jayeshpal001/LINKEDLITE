const express = require('express');
const { createPost, getAllPosts, getUserProfile } = require('../controllers/postController');
const protect = require('../middlewares/authMiddleware');
const router = express.Router();
router.post('/create',protect, createPost); 
router.get('/all', getAllPosts);
router.get('/user/:id', getUserProfile);

module.exports = router; 