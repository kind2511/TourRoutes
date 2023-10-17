const express = require("express");
const userHandler = require("../handlers/userHandler");

const router = express.Router();

// Route to handle user registration
router.route("/register").post(userHandler.signup);  

// Route to handle user login
router.route("/login").post(async (req, res) => {
  try {
    const { email, password } = req.body;

    // Checking if email and password are provided in the request body
    if (!email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Email or password not provided",
      });
    }

    // Call the login function from the handler to verify user's credentials
    const { status, message, token } = await userHandler.login(req, res);

    // If login is successful and a token is generated, set it as a cookie
    if (status === "success" && token) {
      res.cookie('authToken', token, { maxAge: 900000, httpOnly: true });
      // Send the response back with status, message and token, then exit the function
      return res.status(200).json({ status, message, token });
    }

    // If login is unsuccessful, send the appropriate response and message
    return res.status(status === "success" ? 200 : 400).json({ status, message });

  } catch (err) {
    // Catch any errors and send them as a response
    return res.status(400).json({
      status: "fail",
      message: err,
    });
  }
});

// Route to handle email verification using a token
router.route("/verify-email/:token").get(userHandler.verifyEmail);

// Route to get all users
router.route("/").get(userHandler.getUsers);

// Routes to handle operations based on user id - get specific user, update user, delete user
router.route("/:id")
  .get(userHandler.getUser)
  .patch(userHandler.updateUser)
  .delete(userHandler.deleteUser);

// Export the router to be used in the main application
module.exports = router;
