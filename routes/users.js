const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const saltRounds = 10; // You can adjust the cost factor as needed

router.get('/', (req, res) => {
  res.send('List of users???');
});

router.get("/new", (req, res) => {
  res.send('New user form');
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

    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

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
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      const isMatch = await bcrypt.compare(req.body.password, user.password);

      if (isMatch) {
        res.status(200).json({ message: 'Logged in successfully' }); // Passwords match, proceed with login
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