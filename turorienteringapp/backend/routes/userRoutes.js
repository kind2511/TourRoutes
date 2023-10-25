const express = require("express");
const userHandler = require("../handlers/userHandler");
const router = express.Router();

// Route to handle user registration
router.route("/register").post(userHandler.signup);

// Route to handle user login
router.route("/login").post(userHandler.login);

// Route to get all users
router.route("/").get(userHandler.getUsers);

// Route to get info about current loged in user
router.route("/profile/:id").get(userHandler.getUser);

// Routes to handle operations based on user id
router
  .route("/:id")
  .get(userHandler.getUser)
  .patch(userHandler.updateUser)
  .delete(userHandler.deleteUser);

// Route to handle forgot password
router.route("/forgotPassword").post(userHandler.forgotPassword);

//Route to handle reset password
router.route("/resetPassword/:token").patch(userHandler.resetPassword);

module.exports = router;
