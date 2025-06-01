const Ride = require('../models/rideModel');

// Get all rides
// Get all upcoming rides (for ViewRides)
const getAllRides = async (req, res) => {
  try {
    console.log('👉 Fetching all rides...');
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    const rides = await Ride.find({
      date: { $gte: today } // Only today's or future rides
    })
    .sort({ date: 1 }) // Soonest rides first
    .populate('postedBy', 'username email'); // Optional if using ref

    console.log('✅ Fetched rides:', rides.length);
    res.json(rides);
  } catch (err) {
    console.error('❌ Error in getAllRides:', err);
    res.status(500).json({ message: 'Error fetching rides' });
  }
};

// Get rides posted by the logged-in user
const getMyRides = async (req, res) => {
  try {
    const userId = req.user.id;
    const today = new Date().toISOString().split('T')[0];

    // Rides posted by user (future only)
    const posted = await Ride.find({
      'postedBy.userId': userId,
      date: { $gte: today }
    });

    // Rides joined by user (future only)
    const joined = await Ride.find({
      'joinedUsers.userId': userId,
      date: { $gte: today }
    });

    res.json({ posted, joined });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching rides' });
  }
};


// Post a new ride
const postRide = async (req, res) => {
  try {
    const newRide = new Ride({
      from: req.body.from,
      to: req.body.to,
      date: req.body.date,
      time: req.body.time,
      seats: req.body.seats,
      notes: req.body.notes,
      postedBy: {
        userId: req.user.id,
        username: req.user.username,
        email: req.user.email,
      },
    });
    await newRide.save();
    res.status(201).json({ message: 'Ride posted successfully' });
  } catch (err) {
    console.error('❌ Error in postRide:', err);
    res.status(400).json({ message: 'Error posting ride' });
  }
};

// Join a ride
const joinRide = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id);
    const seatsRequested = parseInt(req.body.seats);

    if (!ride) {
      return res.status(404).json({ message: 'Ride not found' });
    }

    if (ride.seats < seatsRequested) {
      return res.status(400).json({ message: 'Not enough seats available' });
    }

    ride.seats -= seatsRequested;

    // ✅ Make sure joinedUsers array exists
    if (!ride.joinedUsers) {
      ride.joinedUsers = [];
    }

    // ✅ Push the current user into joinedUsers array
    ride.joinedUsers.push({
      userId: req.user.id,
      email: req.user.email,
      seatsBooked: seatsRequested
    });

    await ride.save();

    res.status(200).json({ message: 'Joined ride successfully' });
  } catch (error) {
    console.error('❌ Join Ride Error:', error);
    res.status(500).json({ message: 'Failed to join ride' });
  }
};

// Update an existing ride
const updateRide = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id);
    if (!ride) return res.status(404).json({ message: 'Ride not found' });

    if (ride.postedBy.userId !== req.user.id)
      return res.status(403).json({ message: 'Not authorized to update this ride' });

    ride.from = req.body.from || ride.from;
    ride.to = req.body.to || ride.to;
    ride.date = req.body.date || ride.date;
    ride.time = req.body.time || ride.time;
    ride.seats = req.body.seats || ride.seats;
    ride.notes = req.body.notes || ride.notes;

    await ride.save();
    res.json({ message: 'Ride updated successfully' });
  } catch (err) {
    console.error('❌ Error updating ride:', err);
    res.status(500).json({ message: 'Error updating ride' });
  }
};

// Delete a ride
const deleteRide = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id);
    if (!ride) return res.status(404).json({ message: 'Ride not found' });

    if (ride.postedBy.userId !== req.user.id)
      return res.status(403).json({ message: 'Not authorized to delete this ride' });

    await ride.deleteOne();
    res.json({ message: 'Ride deleted successfully' });
  } catch (err) {
    console.error('❌ Error deleting ride:', err);
    res.status(500).json({ message: 'Error deleting ride' });
  }
};

const leaveRide = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id);
    if (!ride) return res.status(404).json({ message: 'Ride not found' });

    const userIndex = ride.joinedUsers.findIndex(j => j.userId.toString() === req.user.id);
    if (userIndex === -1) return res.status(400).json({ message: 'You are not part of this ride' });

    // Add back the seats booked
    const seatsToAdd = ride.joinedUsers[userIndex].seatsBooked || 1;
    ride.seats += seatsToAdd;

    // Remove user from joinedUsers
    ride.joinedUsers.splice(userIndex, 1);

    await ride.save();
    res.status(200).json({ message: 'You have left the ride' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to leave ride' });
  }
};



module.exports = {
  getAllRides,
  postRide,
  joinRide,
  getMyRides,
  updateRide,
  deleteRide,
  leaveRide
};