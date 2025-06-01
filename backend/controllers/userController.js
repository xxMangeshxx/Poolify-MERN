const User = require('../models/user');

// GET /api/auth/me
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch user profile' });
  }
};

// PUT /api/auth/me
const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const { fullName, phone, semester, branch } = req.body;

    user.fullName = fullName || user.fullName;
    user.phone = phone || user.phone;
    user.semester = semester || user.semester;
    user.branch = branch || user.branch;

    await user.save();
    res.json({ message: 'Profile updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update profile' });
  }
};
module.exports = { getProfile, updateProfile };