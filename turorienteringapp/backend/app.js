const express = require("express");

const app = express();

// Middleware (Middle of request and response)

// This populates the body(req.body) with data that you send to it. 
app.use(express.json());

// Creating a simple rout.
app.get("/", (req, res) => {
  res.status(200).json({ message: "First Express Route" });
});

module.exports = app;

