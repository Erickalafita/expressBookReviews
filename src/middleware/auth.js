const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to check if the user is authenticated
const protect = async (req, res, next) => {
  let token;

  // Check if authorization header exists and starts with Bearer
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token (exclude password)
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// Middleware to check if user is registered
const isRegistered = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.status(403).json({ message: 'You need to be a registered user to perform this action' });
  }
};

module.exports = { protect, isRegistered }; 