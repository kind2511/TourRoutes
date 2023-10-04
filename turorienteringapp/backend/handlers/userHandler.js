const User = require("../models/usersModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

// We call the create method on the model itself
// The create method returns a promise so we use async await.
// We save the result of this promise in the newUser variable which will be the newley created document.
// We pass real data into the create method through the req.body (data that comes with the post request)

exports.signup = async (req, res) => {
  try {
    const user = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    });

    // creating a jwt token to automatically log in user once they have signed up
    const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, {
      expiresIn: "1200s",
    });

    res.status(201).json({
      status: "sucsess",
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
  }
};

exports.login = async (req, res) => {
  try {
  } catch (err) {}
};

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

// req.params.id gets us access to the id, beacuse that's what we called it in the userRoutes.js file
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
// we pass in an option containg new: true. This means that it is the newley created document that will be returned
// runValidators: true beacuse we want our schema validators to still apply, for instance if we pass in an integer for firstName
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
