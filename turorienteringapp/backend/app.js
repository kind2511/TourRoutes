const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/userRoutes");

// Load environment variables from the config.env file
require('dotenv').config({ path: './config.env' });

const app = express();

// Use CORS middleware to handle CORS
app.use(cors());

// Middleware
app.use(express.json());

// Routes
app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: "Can't find requested url on this server!",
  });
});

module.exports = app;
