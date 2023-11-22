const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/userRoutes");
const tourRouteRouter = require("./routes/tourRouteRoutes");

// Load environment variables from the config.env file
require("dotenv").config({ path: "./config.env" });

const app = express();

// Use CORS middleware to handle CORS
app.use(cors());

// Middleware
app.use(express.json());

// Mounted Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tourRoutes", tourRouteRouter);

// Enpoint for the frontend to check if server is currently up
app.get("/api/v1/status", (req, res) => {
  res.status(200).json({ message: "Server is up!." });
});

// For all undefined routes
app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: "Can't find requested url on this server!",
  });
});

module.exports = app;
