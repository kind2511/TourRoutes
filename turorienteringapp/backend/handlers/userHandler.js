const User = require("../models/usersModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//------------------------------------------------------------------------------------------------------
// Authentification
//------------------------------------------------------------------------------------------------------

// jwt token expires in 3 days
const maxAge = 3 * 24 * 60 * 60 * 1000;

// Function to generate access token
function generateAccessToken(id, role) {
  return jwt.sign({ id: id, role: role }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge,
  });
}

// Handler to sign up a user
exports.signup = async (req, res) => {
  try {
    // Create a new user with the data provided in the request body
    const user = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      role: req.body.role,
    });

    // Create a JWT token for the newly registered user
    const token = generateAccessToken(user._id, user.role);

    // Send a success response with the token
    res.status(201).json({
      status: "success",
      token,
      data: {
        user: user,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
    console.log(err);
  }
};

// Handler to log in a user
exports.login = async (req, res) => {
  try {
    // Extract email and password from request body
    const { email, password } = req.body;

    // Check if both email and password are provided by user
    if (!email || !password) {
      return res.status(404).json({
        status: "fail",
        message: "Email or password not provided",
      });
    }

    // Find the user in the DB based on the email and password provided by the user
    const user = await User.findOne({ email }).select("+password");

    // If user is not found, send an error response
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "Could not find user",
      });
    }

    // If the user is found, compare the entered password with the stored one
    if (await bcrypt.compare(password, user.password)) {
      // If passwords match, generate a JWT token
      const token = generateAccessToken(user._id, user.role);

      // Send a success response with the token
      return res.status(200).json({
        status: "success",
        message: "Successfully logged in",
        token,
      });
    } else {
      // If passwords don't match, send an error response
      return res.status(401).json({
        status: "fail",
        message: "Unsuccessful login",
      });
    }
  } catch (err) {
    // If there's an error in the process, send an error response
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

// Midlleware to protect routes (checks for user authentification)
exports.authenticate = async (req, res, next) => {
  try {
    // Find the token
    let token;
    // checks the authorization header for the token
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        status: "fail",
        message: "Authentication required. Log in to continue",
      });
    }

    // Validate the token (The jwt algorithm verifies if the token signature is valid or not)
    try {
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      req.user = decoded; // we need this for user roles and permissions
    } catch (err) {
      return res.status(401).send("Invalid Token");
    }

    next();
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Something went wrong when authenticating the user.",
    });
  }
};

// Middleware to check if user has admin role
exports.isAdmin = (req, res, next) => {
  if (req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({
      status: "fail",
      message: "You do not have required authorization to carry out this action",
    });
  }
};

//------------------------------------------------------------------------------------------------------
// User Functionallity
//------------------------------------------------------------------------------------------------------

// Handler to get info about currently logged in user
exports.myProfile = async (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

// Handler to get details of a specific user based on user ID
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
      message: err,
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

// Updating the current user
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
      message: err,
    });
  }
};

// Hanlder to uodate the password of the user
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
      message: err,
    });
  }
};

// Hanlder that allows the current user to delete their account
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
      message: err,
    });
  }
};

// -----------------------------------------------------------------------------------------------------
// Admin Functionallity
// -----------------------------------------------------------------------------------------------------

// Handler to get all users
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
      message: err,
    });
  }
};

// Handler to delete a user based on user ID (For Admin)
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
      message: err,
    });
  }
};

// Handler to promote user to admin
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
      data: { user: promotedUser },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
