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

// Controller to sign up a new user
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

    // Send a success response with the token
    res.status(201).json({
      status: "success",
      data: {
        user: user,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Error registering new user",
    });
  }
};

// Controller to log in a user
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
      message: "Could not log in user",
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

    // look for the token
    if (!token) {
      return res.status(401).json({
        status: "fail",
        message: "Authentication required. Log in to continue",
      });
    }

    // Validate the token (The jwt algorithm verifies if the token signature is valid or not)
    try {
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      req.user = decoded; // lets us access id and role of current logged in user
    } catch (err) {
      return res.status(401).json("Invalid Token");
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
      message:
        "You do not have required authorization to carry out this action",
    });
  }
};
