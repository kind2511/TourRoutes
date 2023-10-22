const express = require("express");
const tourRouteHandler = require("../handlers/tourRouteHandler");

const router = express.Router();

// Route to create a new tour route
router.route("/newTourRoute").post(tourRouteHandler.newTourRoute);

// Routes to get all tour routes
router.route("/").get(tourRouteHandler.getAllTourRoutes);

// Route to handle operations based on tour route id
router.route("/:id").get(tourRouteHandler.getTourRoute);

// Exports markerRoutes into the main application
module.exports = router;
