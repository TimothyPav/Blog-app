const express = require('express');
const router = express.Router();
const Post = require('../models/Post.js');

// Example route: Get all posts
router.get('/', (req, res) => {
  res.send('List of all posts');
});

const { body, validationResult } = require('express-validator');
router.post('/',
[
  body('title').isLength({ min: 4 }).withMessage('Title must be at least 3 characters long'),
  body('content').isLength({ min: 20 }).withMessage('Post is too short!')
], async (req, res) => {
  
  const errors = validationResult(req);
  if( !errors.isEmpty ){
    console.log(errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  const newPost = new Post({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author, // This would be the ObjectId of the user
    genre: req.body.genre
  });

  try {
    const savedPost = await newPost.save();
    console.log("New post created");
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