const mongoose = require('mongoose');

const PlaceSchema = new mongoose.Schema({
  title: { type: String },
  address: { type: String },
  description: { type: String },
  image: [{ type: String }], 
  perks: [String],
  extraInfo: String,
  checkIn: String,
  checkOut: String,
  maxGuests: { type: Number, default: 1 },
  price:{type:String,default:100},
});

const Place = mongoose.model('Place', PlaceSchema);

module.exports = Place;
