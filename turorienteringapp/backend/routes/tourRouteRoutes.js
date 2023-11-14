const express = require("express");
const authentificationController = require("../controllers/authentificationContoller");
const userController = require("../controllers/userController");
const tourRouteController = require("../controllers/tourRouteController");
const router = express.Router();

// Route to create a new tour route
router
  .route("/newTourRoute")
  .post(
    authentificationController.authenticate,
    tourRouteController.newTourRoute
  );

// Route to get all individual routes of one user
router
  .route("/getIndividualUsersTourRoutes")
  .get(
    authentificationController.authenticate,
    tourRouteController.getIndividualUsersTourRoutes
  );

// Route to get all published tour routes
router
  .route("/getAllPublishedTourRoutes")
  .get(
    authentificationController.authenticate,
    tourRouteController.getAllPublishedTourRoutes
  );

//-------------------------------------------------------------------------------------------------------------
// Routes for Admin

// Routes to get all tour routes
router.route("/").get(tourRouteController.getAllTourRoutes);

// Route to handle operations based on tour route id
router
  .route("/:id")
  .get(tourRouteController.getTourRoute)
  .delete(tourRouteController.deleteTourRoute);

// Exports markerRoutes into the main application
module.exports = router;
