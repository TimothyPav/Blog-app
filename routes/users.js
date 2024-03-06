const express = require('express');
const router = express.Router();
const User = require('../models/User');

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

    const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
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


module.exports = router;