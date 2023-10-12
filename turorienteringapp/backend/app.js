const express = require("express");
const cors = require("cors"); // Import the CORS package
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/userRoutes");

const app = express();

// Use CORS middleware to handle CORS
app.use(cors());

// Put jwt token in users cookie
app.use(cookieParser());

// This populates the body(req.body) with data that you send to it.
app.use(express.json());

// Routes
// Mounting the routers
app.use("/api/v1/users", userRouter);

// Functionallity to handle unhandled routes
app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: "Can't find requested url on this server!",
  });
});

module.exports = app;
