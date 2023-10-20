const TourRoute = require("../models/tourRouteModel");

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
