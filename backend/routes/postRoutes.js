const express = require('express');
const {
  createPost,
  getAllPosts,
  getPostById,
  deletePost,
  updatePost, // future use for edit
} = require('../controllers/postController');

const router = express.Router();

// Fetch all blog posts
router.get('/', getAllPosts);

// Fetch a single blog post by ID
router.get('/:id', getPostById);

// Create a new blog post
router.post('/', createPost);

// Delete a blog post by ID
router.delete('/:id', deletePost);

//Update a blog post by ID
router.put('/:id', updatePost);

module.exports = router;
