const express = require("express");
const markerHandler = require("../handlers/markerHandler");

const router = express.Router();

// Saves new markers to DB from frontend
router.route("/newMarkers").post(markerHandler.newMarkers);

// Exports markerRoutes into the main application
module.exports = router;