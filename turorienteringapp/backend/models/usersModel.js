const mongoose = require("mongoose");

//Creating simple userSchema
const userSchema = new mongoose.Schema({
  name: {
    firstName: {
      type: String,
      required: [true, "Enter your first name"],
    },
    lastName: {
      type: String,
      required: [true, "Enter your last name"],
    },
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
