const User = require("../models/usersModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const crypto = require('crypto');  // ---------> For generating email verification tokens
const sendEmail = require('../utils/sendEmail');
/*----------------------------------------------------------*/

// jwt token expires in 2 days (the token will be valid for 3 days)
const maxAge = 3 * 24 * 60 * 60 * 1000;

/*Function to generate access token */
function generateAccessToken(id) {
  return jwt.sign({ id: id }, "secret_for_integrasjonrosjektet_2023", { expiresIn: maxAge });
}

/*-------->
 * Function: generateVerificationToken
  */
 
function generateVerificationToken() {
  return crypto.randomBytes(32).toString('hex');
}


// We call the create method on the model itself
// The create method returns a promise so we use async await.
// We save the result of this promise in the newUser variable which will be the newly created document.
// We pass real data into the create method through the req.body (data that comes with the post request)
exports.signup = async (req, res) => {
  try {
    const user = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      emailVerificationToken: generateVerificationToken(),  // Adding a verification token for the user
      emailVerified: false  // Specifies whether the email is verified
    });

    // Send email with the verification link to the user
    const verificationLink = `http://localhost:3000/verify-email/${user.emailVerificationToken}`;
    await sendEmail({
      email: user.email,
      subject: 'Verify your email address',
      message: `Thank you for registering! Please verify your email by clicking on the following link: ${verificationLink}`
    });

    // Creating a jwt token to automatically log in user once they have signed up
    const token = generateAccessToken(user._id);

    res.status(201).json({
      status: "success",
      token, // sends token to client
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

/*---------------login handler---------------> */

// Logs the user in based on given password and email by signing a json web token and sending it back to the client
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for both email and password
    if (!email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Email or password not provided",
      });
    }

    // Try to find user by email
    const user = await User.findOne({ email }).select("+password");

    // If user does not exist
    if (!user) {
      return res.status(400).json({
        status: "fail",
        message: "Could not find user",
      });
    }

    // Compare password stored in db with entered password
    if (await bcrypt.compare(password, user.password)) {
      // If passwords match, generate an access token for the user
      const token = generateAccessToken(user._id);
      return res.status(200).json({
        status: "success",
        message: "Successfully logged in",
        token  // 'token' is the user's JWT for authentication.
      });
    } else {
      // If passwords do not match
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


/*-------------------------------------------------------------------*/
// When we don't pass anything into the find method it will return every document in its collection
// The find method returns a query
// The find method will return an array of all the documents
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
      status: "success",
      data: {
        users: users,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

// req.params.id gets us access to the id, because that's what we called it in the userRoutes.js file
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    res.status(200).json({
      status: "success",
      data: {
        user: user,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

// req.body because that is where the data that we want to change resides
// we pass in an option containing new: true. This means that it is the newly created document that will be returned
// runValidators: true because we want our schema validators to still apply, for instance if we pass in an integer for firstName
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        user: user,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

// We do not store the result of the query in a variable because we do not send it back to the client
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};




/*---------> Added New: handler to verify the user's email based on the token they provide */
exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({ emailVerificationToken: token });
    if (!user) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid verification token",
      });
    }

    user.emailVerified = true;
    user.emailVerificationToken = undefined; // Clear the verification token
    await user.save();

    res.status(200).json({
      status: "success",
      message: "Email successfully verified!",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};