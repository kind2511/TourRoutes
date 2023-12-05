const User = require("../models/usersModel");

//------------------------------------------------------------------------------------------------------
// User Functionallity
//------------------------------------------------------------------------------------------------------

// Controller to get info about currently logged in user
exports.myProfile = async (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

// Controller to get details of a specific user based on user ID
exports.getUser = async (req, res) => {
  try {
    // Fetch user details based on user ID from the request parameters
    const user = await User.findById(req.params.id);

    // Send a success response with the user details
    res.status(200).json({
      status: "success",
      data: {
        user: user,
      },
    });
  } catch (err) {
    // If there's an error in fetching the user, send an error response
    res.status(400).json({
      status: "fail",
      message: "Could not find user",
    });
  }
};

// Function to decide which feilds that the user is going to be able to update
const filterObj = (obj, ...legalFields) => {
  const newObject = {};
  Object.keys(obj).forEach((el) => {
    if (legalFields.includes(el)) newObject[el] = obj[el];
  });
  return newObject;
};

// Controller to update the current user
exports.updateMyProfile = async (req, res) => {
  try {
    // Decide the fields that the user can update (firstName, lastName, and email)
    const legalUpdates = filterObj(req.body, "firstName", "lastName", "email");

    // Update the current user
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      legalUpdates,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      status: "success",
      data: { user: updatedUser },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Something went wrong when trying to update your data",
    });
  }
};

// Controller to update the password of the user
exports.updateMyPassword = async (req, res) => {
  try {
    // Update user password based on user ID and data from request body
    const user = await User.findById(req.user.id).select("+password");

    // update users password
    user.password = req.body.password;
    user.confirmPassword = req.body.confirmPassword;

    // save the updated password to the DB
    await user.save();

    // Send a success response indicating the users password has been updated
    res.status(200).json({
      status: "success",
      message: "Password has been updated successfully",
    });
  } catch (err) {
    // If there's an error updating the password, send an error response
    res.status(400).json({
      status: "fail",
      message: "Could not update password",
    });
  }
};

// Controller that allows the current user to delete their account
exports.deleteMyProfile = async (req, res) => {
  try {
    // Find user to delete
    await User.findByIdAndDelete(req.user.id);

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Could not delete account",
    });
  }
};

// -----------------------------------------------------------------------------------------------------
// Admin Functionallity
// -----------------------------------------------------------------------------------------------------

// Controller to get all users
exports.getUsers = async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await User.find();

    // Send a success response with the list of users
    res.status(200).json({
      status: "success",
      data: {
        users: users,
      },
    });
  } catch (err) {
    // If there's an error in fetching users, send an error response
    res.status(400).json({
      status: "fail",
      message: "Could retrive all users",
    });
  }
};

// Controller to delete a user based on user ID (For Admin)
exports.deleteUser = async (req, res) => {
  try {
    // Delete the user based on the provided user ID from request parameters
    await User.findByIdAndDelete(req.params.id);

    // Send a success response indicating the user has been deleted
    res.status(200).json({
      status: "success",
      message: "User has been deleted successfully",
    });
  } catch (err) {
    // If there's an error in deleting the user, send an error response
    res.status(400).json({
      status: "fail",
      message: "Could not delete user",
    });
  }
};

// Controller to promote user to admin
exports.promoteToAdmin = async (req, res) => {
  try {
    // Finds a user and upgrades their role to admin
    const promotedUser = await User.findByIdAndUpdate(
      req.params.id,
      { role: "admin" },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      status: "success",
      message: "User has been promoted to admin",
      data: { user: promotedUser },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Could not promote user to admin",
    });
  }
};
