const Post = require('../models/Post');

// Create Post
exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    const newPost = await Post.create({
      title,
      content,
      createdBy: req.user?._id || null,
      isEdited: false,
      history: [],
    });

    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get All Posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate('createdBy', 'name')
      .populate('editedBy', 'name');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Single Post
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('createdBy', 'name')
      .populate('editedBy', 'name')
      .populate('history.editedBy', 'name');

    if (!post) return res.status(404).json({ error: 'Post not found' });

    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    if (!post.createdBy.equals(req.user._id)) {
      return res.status(403).json({ error: 'Forbidden: Only the owner can delete this post' });
    }

    await post.deleteOne();
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Post with Edit History
exports.updatePost = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: 'Unauthorized. Please log in.' });
    }

    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    if (!post.createdBy.equals(req.user._id)) {
      return res.status(403).json({ error: 'Forbidden: Only the owner can edit this post' });
    }

    post.history.push({
      title: post.title,
      content: post.content,
      editedAt: new Date(),
      editedBy: req.user._id,
    });

    post.title = title;
    post.content = content;
    post.isEdited = true;
    post.editedBy = req.user._id;

    await post.save();
    res.json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
