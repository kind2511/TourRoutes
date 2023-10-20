const express = require("express");
const tourRouteHandler = require("../handlers/tourRouteHandler");

const router = express.Router();

// Saves new tourRoute to DB from frontend
router.route("/newTourRoute").post(tourRouteHandler.newTourRoute);

// Exports markerRoutes into the main application
module.exports = router;
