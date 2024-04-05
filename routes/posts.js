const express = require('express');
const router = express.Router();
const Post = require('../models/Post.js');
const authenticateToken = require('../middleware/authenticateToken');

// Example route: Get all posts
router.get('/', (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit, 10) : 0; // Convert limit to number, default to all posts

  Post.find({}).limit(limit)
    .then(posts => {
      res.json(posts);
    })
    .catch(error => {
      console.error('Error fetching posts:', error);
      res.status(500).send('Error fetching posts');
    });
});

router.post('/qwerty', (req, res) => {
  res.json({ message: 'List of all posts' });
});

const { body, validationResult } = require('express-validator');
router.post('/', authenticateToken,
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
    author: req.user.userID, // This would be the ObjectId of the user
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
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id); // Find the post by ID
    if (post) {
      res.json(post); // Send back the found post
    } else {
      res.status(404).send('Post not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching post');
  }
});

module.exports = router;