const express = require("express");
const userController = require("../controllers/userController");
const authentificationController = require("../controllers/authentificationContoller");

const router = express.Router();

// Route to handle user registration
router.route("/register").post(authentificationController.signup);

// Route to handle user login
router.route("/login").post(authentificationController.login);

// Route to get info about current loged in user
router
  .route("/myProfile")
  .get(
    authentificationController.authenticate,
    userController.myProfile,
    userController.getUser
  );

// Route to update name and email of current user
router
  .route("/updateMyProfile")
  .patch(
    authentificationController.authenticate,
    userController.updateMyProfile
  );

// Route to update the password of the current user
router
  .route("/updateMyPassword")
  .patch(
    authentificationController.authenticate,
    userController.updateMyPassword
  );

// Route to delete the current user
router
  .route("/deleteMyProfile")
  .delete(
    authentificationController.authenticate,
    userController.deleteMyProfile
  );

// ----------------------------------------------------------------------------------------------------------------------
// Routes for Admin
// ----------------------------------------------------------------------------------------------------------------------

// Route to promote user to admin
router
  .route("/promoteToAdmin/:id")
  .patch(
    authentificationController.authenticate,
    authentificationController.isAdmin,
    userController.promoteToAdmin
  );

// Route to get all users
router
  .route("/")
  .get(
    authentificationController.authenticate,
    authentificationController.isAdmin,
    userController.getUsers
  );

// Routes to handle operations based on user id
router
  .route("/:id")
  .get(
    authentificationController.authenticate,
    authentificationController.isAdmin,
    userController.getUser
  )
  .delete(
    authentificationController.authenticate,
    authentificationController.isAdmin,
    userController.deleteUser
  );

module.exports = router;
