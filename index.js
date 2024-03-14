const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const router = express.Router();
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
require('dotenv').config();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: "Too many requests from this IP, please try again after 15 minutes",
});

app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware for parsing application/x-www-form-urlencoded
app.use(limiter);

mongoose.connect('mongodb://localhost:27017/blogDB')
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

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});