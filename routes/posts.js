const express = require('express');
const router = express.Router();

// Example route: Get all posts
router.get('/', (req, res) => {
  res.send('List of all posts');
});

// Example route: Create a new post
router.post('/', async (req, res) => {
  const newPost = new Post({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author // This would be the ObjectId of the user
  });

  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Example route: Get a single post by id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.send(`Fetching post with id ${id}`);
});

module.exports = router;