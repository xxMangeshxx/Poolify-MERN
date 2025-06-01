const express = require('express');
const router = express.Router();
const {
  getAllRides,
  postRide,
  joinRide,
  getMyRides,
  updateRide,
  deleteRide,
  leaveRide
} = require('../controllers/rideController');
const protect = require('../middleware/authMiddleware');

// Get all available rides
router.get('/', protect, getAllRides);

// Get my Rides only (Posted and Joined by Me)
router.get('/my-rides', protect, getMyRides);

// Post a new ride
router.post('/', protect, postRide);

// Post a Request to Join a ride
router.post('/join/:id', protect, joinRide);

// Update a ride
router.put('/:id', protect, updateRide);

// Delete a ride
router.delete('/:id', protect, deleteRide);

// Leave a ride
router.post('/leave/:id', protect, leaveRide);

module.exports = router;

