const User = require("../models/usersModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// jwt token expires in 3 days
const maxAge = 3 * 24 * 60 * 60 * 1000;

// Function to generate access token
function generateAccessToken(id) {
  return jwt.sign({ id: id }, process.env.TOKEN_SECRET, { expiresIn: maxAge });
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
    });

    // Create a JWT token for the newly registered user
    const token = generateAccessToken(user._id);

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

    // Check if both email and password are provided
    if (!email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Email or password not provided",
      });
    }

    // Find the user with the given email
    const user = await User.findOne({ email }).select("+password");

    // If user is not found, send an error response
    if (!user) {
      return res.status(400).json({
        status: "fail",
        message: "Could not find user",
      });
    }

    // If the user is found, compare the entered password with the stored one
    if (await bcrypt.compare(password, user.password)) {
      // If passwords match, generate a JWT token
      const token = generateAccessToken(user._id);

      // Send a success response with the token
      return res.status(200).json({
        status: "success",
        message: "Successfully logged in",
        token
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


// Handler to get a list of all users
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

/// Handler to update details of a specific user based on user ID
exports.updateUser = async (req, res) => {
  try {
    // Update user details based on user ID and data from request body
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    // Send a success response with the updated user details
    res.status(200).json({
      status: "success",
      data: {
        user: user,
      },
    });
  } catch (err) {
    // If there's an error in updating the user, send an error response
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

// Handler to delete a user based on user ID
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