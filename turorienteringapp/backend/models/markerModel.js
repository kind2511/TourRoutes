const mongoose = require("mongoose");

// Creating a schma for markers on the maps for the routes
const markerSchema = new mongoose.Schema({
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});

const Marker = mongoose.model("Marker", markerSchema);

module.exports = Marker;
