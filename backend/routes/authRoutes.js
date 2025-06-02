const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Ride = require('../models/Ride');
const router = express.Router();

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id, username: user.username, email: user.email}, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { email: user.email } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/auth/signup
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already in use' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign({ userId: newUser._id, username: newUser.username, email: newUser.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(201).json({ token, user: { username: newUser.username, email: newUser.email } });

  } catch (err) {
    res.status(500).json({ message: 'Error creating user' });
  }
});

const protect = require('../middleware/authMiddleware');
const { getProfile, updateProfile } = require('../controllers/userController');

router.get('/me', protect, getProfile);
router.put('/me', protect, updateProfile);

router.get('/past-rides', protect, async (req, res) => {
  try {
    const userId = req.user.id;
    const today = new Date().toISOString().split('T')[0];
    console.log("User ID:", userId);
    console.log("Today:", today);


    // Rides user posted
    const postedRides = await Ride.find({
      'postedBy.userId': userId,
      date: { $lt: today }
    }).sort({ date: -1 });

    // Rides user joined
    const joinedRides = await Ride.find({
      'joinedUsers.userId': userId,
      date: { $lt: today }
    }).sort({ date: -1 });

    res.json({ postedRides, joinedRides });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching past rides' });
  }
});


module.exports = router;
