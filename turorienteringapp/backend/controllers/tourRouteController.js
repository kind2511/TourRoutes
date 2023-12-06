const TourRoute = require("../models/tourRouteModel");

// Controller to create a new tour route
exports.newTourRoute = async (req, res) => {
  try {
    // recieves data from client
    const { name, published, coordinates } = req.body;

    // Creates a new tourroute document
    const newTourRoute = new TourRoute({
      name,
      type: "Linestring",
      published,
      coordinates,
      user_id: req.user.id,
    });
    // Stores the new tourroute document in DB.
    newTourRoute.save();
    res.status(201).json({
      status: "success",
      message: "New TourRoute successfully created and stored in DB",
      newTourRoute,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "Was not able to store new TourRoute in DB",
    });
  }
};

// Controller to get all individual users tour routes
exports.getIndividualUsersTourRoutes = async (req, res) => {
  try {
    // Fetch all tours that have the same user_id as the current logged in user
    const tourRoutes = await TourRoute.find({ user_id: req.user.id });

    // Send a success response with the list of tour routes associated with one user
    res.status(200).json({
      status: "success",
      data: {
        tourRoutes: tourRoutes,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Could not get tour routes",
    });
  }
};

// Controller to get all published tour routes
exports.getAllPublishedTourRoutes = async (req, res) => {
  try {
    // Fetch all tour routes from the database
    const tourRoutes = await TourRoute.find({ published: true });

    // Send a success response with the list of users
    res.status(200).json({
      status: "success",
      data: {
        tourRoutes: tourRoutes,
      },
    });
  } catch (err) {
    // If there's an error in fetching tour routes, send an error response
    res.status(400).json({
      status: "fail",
      message: "Could not get all published tour routes",
    });
  }
};

// Controller to get all tour routes
exports.getAllTourRoutes = async (req, res) => {
  try {
    // Fetch all tour routes from the database
    const tourRoutes = await TourRoute.find();

    // Send a success response with the list of tour routes
    res.status(200).json({
      status: "success",
      data: {
        tourRoutes: tourRoutes,
      },
    });
  } catch (err) {
    // If there's an error in fetching tour routes, send an error response
    res.status(400).json({
      status: "fail",
      message: "Could not get all tour routes",
    });
  }
};

// Controller to get details of a specific tour route based on ID of the tour route
exports.getTourRoute = async (req, res) => {
  try {
    // Fetch tour routes details based on its ID from the request parameters
    const tourRoute = await TourRoute.findById(req.params.id);

    // Send a success response with the tour Route details
    res.status(200).json({
      status: "success",
      data: {
        tourRoute: tourRoute,
      },
    });
  } catch (err) {
    // If there's an error in fetching the tour route, send an error response
    res.status(400).json({
      status: "fail",
      message: "Could not get tour route",
    });
  }
};

// Controller to delete a tour route based in tour route ID
exports.deleteTourRoute = async (req, res) => {
  try {
    // Delete the tour route based on their user ID
    await TourRoute.findByIdAndDelete(req.params.id);

    // Send a success response indicating the tour route has been deleted
    res.status(200).json({
      status: "success",
      message: "Tour route has been deleted successfully",
    });
  } catch (err) {
    // If there's an error in deleting the user, send an error response
    res.status(400).json({
      status: "fail",
      message: "Could not delete requested tour route",
    });
  }
};

//-----------------------------------------------------------------------------------------------------------------

// Not implemented in Application

// Controller to toggle between publish/unpublish field on tour route
exports.toggleRoute = async (req, res) => {
  try {
    // Fetch tour routes details based on its ID from the request parameters
    const tourRoute = await TourRoute.findById(req.params.id);

    // Toggles the published field
    tourRoute.published = !tourRoute.published;

    // Saves the updated tour route
    await tourRoute.save();

    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Could not alter published field",
    });
  }
};

