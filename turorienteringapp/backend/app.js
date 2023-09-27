const express = require("express");
const userRouter = require("./routes/userRoutes");

const app = express();

// Middleware (Middle of request and response)

// This populates the body(req.body) with data that you send to it.
app.use(express.json());

// Routes
// Mounting the routers
app.use("/api/v1/users", userRouter);

module.exports = app;
