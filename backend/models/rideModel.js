const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  from: String,
  to: String,
  date: String,
  time: String,
  seats: Number,
  notes: String,
  postedBy: {
    userId: String,       // store req.user.id
    username: String,     // store req.user.username
    email: String         // store req.user.email
  },
  joinedUsers: [
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    email: String,
    seatsBooked: Number,
  }
]
});

module.exports = mongoose.model('Ride', rideSchema);
