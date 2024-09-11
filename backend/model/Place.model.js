const mongoose = require('mongoose');

const PlaceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  address: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String }, // Store image URL or path
  perks: [String],
  extraInfo: String,
  checkIn: String,
  checkOut: String,
  maxGuests: { type: Number, default: 1 },
});

const Place = mongoose.model('Place', PlaceSchema);

module.exports = Place;
