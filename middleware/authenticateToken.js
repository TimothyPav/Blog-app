const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  // Authorization: Bearer TOKEN_STRING_HERE
  const token = authHeader && authHeader.split(' ')[1]; // Get the token part of the header

  if (token == null) {
    return res.sendStatus(401); // If no token, not authorized
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Token is no longer valid
    }

    req.user = user; // Add the user payload to the request
    next(); // Pass control to the next handler
  });
};

module.exports = authenticateToken;