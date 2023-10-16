const express = require("express");
const userHandler = require("../handlers/userHandler");

const router = express.Router();

// Sign up user route
router.route("/register").post(userHandler.signup);  // <-- Changed this from '/signup' to '/register'

// Log in user route
router.route("/login").post(userHandler.login);

// Email verification route
router.route("/verify-email/:token").get(userHandler.verifyEmail);  // -----> Added this for email verification

// Routes without parameters
router.route("/").get(userHandler.getUsers);

// Routes which require an id parameter
router.route("/:id")
  .get(userHandler.getUser)
  .patch(userHandler.updateUser)
  .delete(userHandler.deleteUser);

// Exports userRoutes into the main application
module.exports = router;
