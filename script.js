// This code is for demonstration purposes only and may not be fully functional or accurate.

// Import the required modules
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('./models/user');

// Create an express app
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/m07tutorial', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Use JSON middleware
app.use(express.json());

// Create a middleware function to verify JWT tokens
const verifyToken = (req, res, next) => {
  // Get the authorization header from the request
  const authHeader = req.headers['authorization'];
  // Extract the token from the header
  const token = authHeader && authHeader.split(' ')[1];
  // If there is no token, return a 401 error
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  // Verify the token using the secret key
  jwt.verify(token, 'secret', (err, user) => {
    // If the token is invalid, return a 403 error
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    // Attach the user to the request object
    req.user = user;
    // Call the next middleware function
    next();
  });
};

// Create a route to register a new user
app.post('/register', async (req, res) => {
  // Get the username and password from the request body
  const { username, password } = req.body;
  // Check if the username and password are provided
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }
  // Check if the username already exists in the database
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(409).json({ message: 'Username already taken' });
  }
  // Create a new user instance
  const user = new User({ username, password });
  // Save the user to the database
  await user.save();
  // Return a success message
  res.status(201).json({ message: 'User registered successfully' });
});

// Create a route to login a user
app.post('/login', async (req, res) => {
  // Get the username and password from the request body
  const { username, password } = req.body;
  // Check if the username and password are provided
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }
  // Find the user by username in the database
  const user = await User.findOne({ username });
  // Check if the user exists and the password matches
  if (!user || !user.comparePassword(password)) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }
  // Generate a JWT token using the user id and the secret key
  const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '1h' });
  // Return the token and the user information
  res.status(200).json({ token, user });
});

// Create a route to get the current user profile
app.get('/profile', verifyToken, async (req, res) => {
  // Get the user id from the token
  const { id } = req.user;
  // Find the user by id in the database
  const user = await User.findById(id);
  // Check if the user exists
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  // Return the user information
  res.status(200).json({ user });
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
