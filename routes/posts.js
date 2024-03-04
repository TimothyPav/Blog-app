const express = require('express');
const router = express.Router();
const Post = require('../models/Post.js');

// Example route: Get all posts
router.get('/', (req, res) => {
  res.send('List of all posts');
});

// Example route: Create a new post
router.post('/', async (req, res) => {
  const newPost = new Post({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author, // This would be the ObjectId of the user
    genre: req.body.genre
  });

  try {
    console.log("POGGERS");
    const savedPost = await newPost.save();
    console.log("POGGERS");
    res.status(201).json(savedPost);
  } catch (err) {
    console.log(err); // This will help identify what went wrong
  res.status(400).json({ message: err.message });
  }
});

// Example route: Get a single post by id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.send(`Fetching post with id ${id}`);
});

module.exports = router;