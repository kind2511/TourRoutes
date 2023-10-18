const Marker = require("../models/markerModel");

exports.newMarkers = async (req, res) => {
  try {
    // Markers gets sent as an array in the request body
    const markersArray = req.body;

    // Creates an array of new marker documents to be stored in the DB
    const newMarkers = markersArray.map((marker) => {
      return new Marker({
        location: {
          type: "Point",
        },
        coordinates: marker.coordinates,
      });
    });

    // Persists the newley markers in the DB
    await Marker.insertMany(newMarkers);

    // Sends info back to the client containg info about the newley created markers
    res.status(201).json(newMarkers);
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "Was not able to store the new markers in the DB",
    });
  }
};