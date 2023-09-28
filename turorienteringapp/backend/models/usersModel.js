const mongoose = require("mongoose");

//Creating simple userSchema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Enter your first name"], // Validator
  },
  lastName: {
    type: String,
    required: [true, "Enter your last name"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Enter a valid email"],
  },
  password: {
    type: String,
    minlength: 8,
    required: [true, "Enter your password"],
  },
  confirmPassword: {
    type: String,
    required: [true, "Confirm your passeord"],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;

// Creating an instance of model to see if connection with db works
// const testUser = new User({
//   firstName: "Kelly",
//   lastName: "Jordan",
//   email: "kellyJo@gmail.com",
//   password: "password",
//   confirmPassword: "password",
// });

// testUser
//   .save()
//   .then((doc) => {
//     console.log(doc);
//   })
//   .catch((err) => {
//     console.log("Error 💥:", err);
//   });
