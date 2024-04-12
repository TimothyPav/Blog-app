const express = require('express');
const router = express.Router();
const Post = require('../models/Post.js');
const { authenticateToken, optionalAuthenticateToken } = require('../middleware/authenticateToken');
const User = require('../models/User');

function parseDate(dateStr) {
  // Match the date and time parts of the format 'm/d/yyyy @ h:mm AM/PM'
  const parts = dateStr.match(/(\d+)\/(\d+)\/(\d+) @ (\d+):(\d+) ([APM]+)/);
  
  // Extract parts using destructuring
  const [, month, day, year, hour, minutes, modifier] = parts;

  // Convert 12-hour time to 24-hour time
  let hours24 = parseInt(hour, 10);
  if (modifier === 'PM' && hours24 < 12) {
    hours24 += 12;
  } else if (modifier === 'AM' && hours24 === 12) {
    hours24 = 0;
  }

  // Return the date object
  return new Date(year, month - 1, day, hours24, minutes);
}
// Example route: Get all posts
router.get('/', async (req, res) => {
  try {
    let posts = await Post.find().limit(100); // Adjust limit as needed

    // Sort the posts by date using the custom parseDate function
    posts = posts.sort((a, b) => parseDate(b.date) - parseDate(a.date));

    // Slice the array to only include the latest 10 posts
    posts = posts.slice(0, 15);

    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/by-author/:authorName', async (req, res) => {
  const authorName = req.params.authorName;
  try {
      const posts = await Post.find({ author: authorName });
      res.json(posts);
  } catch (error) {
      console.error("Error accessing the database:", error);
      res.status(500).send("Error accessing the database");
  }
});

const { body, validationResult } = require('express-validator');
router.post('/', optionalAuthenticateToken,
[
  body('title').isLength({ min: 4 }).withMessage('Title must be at least 3 characters long'),
  body('content').isLength({ min: 20 }).withMessage('Post is too short!')
], async (req, res) => {
  
  const errors = validationResult(req);
  if( !errors.isEmpty ){
    console.log(errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  let user = null
  try {
    console.log("req.user: " + req.user)
    user = await User.findById(req.user.userID);
  } catch {}
  const author = user!=null ? user.username : "Anonymous"

  const newPost = new Post({
    title: req.body.title,
    content: req.body.content,
    author: author, // This would be the username of the user
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

router.get('/new', (req, res) => {
  
})

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