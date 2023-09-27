const express = require("express");
const userHandler = require("../handlers/userHandler");

const router = express.Router();

// Routes without paramaters
router.route("/").get(userHandler.getUsers).post(userHandler.newUser);

// Routes which requires id parameter
router
  .route("/:id")
  .get(userHandler.getUser)
  .patch(userHandler.updateUser)
  .delete(userHandler.deleteUser);

// Exports userRoutes into main application
module.exports = router;
