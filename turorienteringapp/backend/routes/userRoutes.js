const express = require("express");
const userHandler = require("../handlers/userHandler");

const router = express.Router();

// Sign up user route
router.route("/signup").post(userHandler.signup);

// Log in user route
router.route("/login").post(userHandler.login);

// Routes without paramaters
router.route("/").get(userHandler.getUsers);

// Routes which requires id parameter
router
  .route("/:id")
  .get(userHandler.getUser)
  .patch(userHandler.updateUser)
  .delete(userHandler.deleteUser);

// Exports userRoutes into main application
module.exports = router;
