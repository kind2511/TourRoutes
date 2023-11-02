const express = require("express");
const userHandler = require("../handlers/userHandler");
const router = express.Router();

// Route to handle user registration
router.route("/register").post(userHandler.signup);

// Route to handle user login
router.route("/login").post(userHandler.login);

// Route to get info about current loged in user
router
.route("/myProfile")
.get(userHandler.authenticate, userHandler.myProfile, userHandler.getUser);

// Route to update name and email of current user
router
.route("/updateMyProfile")
.patch(userHandler.authenticate, userHandler.updateMyProfile);

// Route to delete the current user
router
.route("/deleteMyProfile")
.delete(userHandler.authenticate, userHandler.deleteMyProfile);

//----------------------------------------------------------------------------------------------------------------------
// Routes currently being worked on

// Route to handle forgot password
router.route("/forgotPassword").post(userHandler.forgotPassword);

//Route to handle reset password
router.route("/resetPassword/:token").patch(userHandler.resetPassword);

// ----------------------------------------------------------------------------------------------------------------------
// Routes for Admin

// Route to get all users
router.route("/").get(userHandler.getUsers);

// Routes to handle operations based on user id (For ADMIN)
router
  .route("/:id")
  .get(userHandler.getUser)
  .patch(userHandler.updateUser)
  .delete(userHandler.deleteUser);


module.exports = router;
