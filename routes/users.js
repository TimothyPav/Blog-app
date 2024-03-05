const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', (req, res) => {
  res.send('List of users???');
});

router.get("/new", (req, res) => {
  res.send('New user form');
});

router.post("/new", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err){
    console.log(err);
    res.status(400).json({ message: err.message });
  }
});


module.exports = router;