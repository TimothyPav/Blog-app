const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { authenticateToken, optionalAuthenticateToken } = require('../middleware/authenticateToken');

router.get('/', (req, res) => {
  res.send('List of users???');
});

router.get("/new", (req, res) => {
  res.send('New user form');
});


router.get('/profile', authenticateToken, async (req, res) => {
  // req.user contains the JWT payload including userID
  try {
      const user = await User.findById(req.user.userID); // Fetch user from database
      if (!user) {
          return res.status(404).send('User not found');
      }
      res.send(user); // Send the full user profile
  } catch (error) {
      console.error("Failed to fetch user:", error);
      res.status(500).send("Error fetching user data");
  }
});

const { body, validationResult } = require('express-validator');
router.post("/new",
  [
    body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'), // username should not be empty
    body('email').isEmail().withMessage('Email is invalid'), // username must be an email
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long') // password must be at least 5 chars long
  ], async (req, res) => {

    const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
    console.log("new user created");
  } catch (err){
    console.log(err);
    res.status(400).json({ message: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({
      $or: [
        { email: req.body.login },
        { username: req.body.login }
      ]
    });

    if (user) {
      const isMatch = await bcrypt.compare(req.body.password, user.password);

      if (isMatch) {

        const token = jwt.sign(
          {userID: user._id }, // This is the payload, typically containing user ID and other data
          process.env.JWT_SECRET, // The secret key, which should be stored in an environment variable
          { expiresIn: '1h' } // Options, setting the token to expire in one hour
        );

        res.json({ token });

        //res.status(200).json({ message: 'Logged in successfully' }); // Passwords match, proceed with login
        console.log('Logged in successfully');
      } else {
        res.status(401).json({ message: 'Invalid credentials' }); // Passwords do not match
        console.log('Invalid credentials');
      }
    } else {
      res.status(404).json({ message: 'User not found' }); // User not found
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;