const express = require("express");

const app = express();

// Middleware (Middle of request and response)
// This populates the body(req.body) with data that you send to it.
app.use(express.json());

//---------------------------------------------------------------------------

const getTestMessage = (req, res) => {
  res.status(200).json({ message: "TurRute" });
};

const getAllTestmessages = (req, res) => {
  res.status(200).json({ message: "Alle Turruter" });
};

// Creating simple routes for testing
app.get("/turruter", getTestMessage);
app.get("/alleturruter", getAllTestmessages);


//----------------------------------------------------------------------------

module.exports = app;
