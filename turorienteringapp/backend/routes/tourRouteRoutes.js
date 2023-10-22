const express = require("express");
const tourRouteHandler = require("../handlers/tourRouteHandler");

const router = express.Router();

// Saves new tour route to DB from frontend
router.route("/newTourRoute").post(tourRouteHandler.newTourRoute);

// Gets all tour routes
router.route("/").get(tourRouteHandler.getAllTourRoutes);

// Exports markerRoutes into the main application
module.exports = router;
