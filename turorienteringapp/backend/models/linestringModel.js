const mongoose = require("mongoose");

// Creating a schma for markers on the maps for the routes
const linestringSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Linestring"],
    required: true,
  },
  coordinates: {
    type: [[Number]], // Array of array containing numbers
    required: true,
  },
});

const Linestring = mongoose.model("Marker", linestringSchema);

module.exports = Linestring;
