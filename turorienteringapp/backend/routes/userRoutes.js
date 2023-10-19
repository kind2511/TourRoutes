const express = require("express");
const userHandler = require("../handlers/userHandler");
const router = express.Router();

// Route to handle user registration
router.route("/register").post(userHandler.signup);

// Route to handle user login
router.route("/login").post(userHandler.login);

// Route to get all users
router.route("/").get(userHandler.getUsers);

// Routes to handle operations based on user id
router.route("/:id")
    .get(userHandler.getUser)
    .patch(userHandler.updateUser)
    .delete(userHandler.deleteUser);

module.exports = router;
