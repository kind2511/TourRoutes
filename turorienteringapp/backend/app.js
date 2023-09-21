const express = require("express");

const app = express();

app.use(express.json());

// Creating a simple rout.
app.get("/", (req, res) => {
  res.status(200).json({ message: "First Express Route" });
});

module.exports = app;

