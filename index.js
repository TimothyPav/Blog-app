const express = require('express');
const router = express.Router();
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');

app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware for parsing application/x-www-form-urlencoded

mongoose.connect('mongodb://localhost:27017/blogDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("An error has occurred", err));


// Require route modules
const postsRouter = require('./routes/posts');
const usersRouter = require('./routes/users'); // Example for user routes

// Use route modules
app.use('/posts', postsRouter);
app.use('/users', usersRouter); // Example for user routes

app.get('/', (req, res) => {
  res.send('Hello, World!');
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});