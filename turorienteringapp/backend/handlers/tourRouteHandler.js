const TourRoute = require("../models/tourRouteModel");

// Handler to create a new tour route
exports.newTourRoute = async (req, res) => {
  try {
    const { name, coordinates } = req.body;

    // Creates a new tourroute document
    const newTourRoute = new TourRoute({
      name,
      type: "Linestring",
      coordinates,
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

// Handler to get all tour routes
exports.getAllTourRoutes = async (req, res) => {
  try {
    // Fetch all tour routes from the database
    const tourRoutes = await TourRoute.find();

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
      message: err,
    });
  }
};

// Handler to get details of a specific tour route based on ID of the tour route
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
      message: err,
    });
  }
};
