const express = require("express");
const tourRouteHandler = require("../handlers/tourRouteHandler");
const userHandler = require("../handlers/userHandler");

const router = express.Router();

// Route to create a new tour route
router
  .route("/newTourRoute")
  .post(userHandler.authenticate, tourRouteHandler.newTourRoute);

// Route to get all individual routes of one user
router
  .route("/getIndividualUsersTourRoutes")
  .get(userHandler.authenticate, tourRouteHandler.getIndividualUsersTourRoutes);

// Route to get all published tour routes
router
  .route("/getAllPublishedTourRoutes")
  .get(userHandler.authenticate, tourRouteHandler.getAllPublishedTourRoutes);

//-------------------------------------------------------------------------------------------------------------
// Routes for Admin

// Routes to get all tour routes
router.route("/").get(tourRouteHandler.getAllTourRoutes);

// Route to handle operations based on tour route id
router
  .route("/:id")
  .get(tourRouteHandler.getTourRoute)
  .delete(tourRouteHandler.deleteTourRoute);

// Exports markerRoutes into the main application
module.exports = router;
