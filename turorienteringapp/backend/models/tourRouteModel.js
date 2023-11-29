const mongoose = require("mongoose");

// Creating a scehma for tour routes represented as a linestring on the maps for the routes
const tourRouteSchema = new mongoose.Schema({
  name: String,
  type: {
    type: String,
    enum: ["Linestring"],
    required: true,
  },
  coordinates: {
    type: [[Number]], // Array of array containing numbers
    required: true,
  },
  published: Boolean,
  user_id: String,
});

const TourRoute = mongoose.model("TourRoute", tourRouteSchema);

module.exports = TourRoute;
