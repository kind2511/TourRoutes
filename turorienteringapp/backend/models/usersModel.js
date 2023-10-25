const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

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
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, "Confirm your password"], // Corrected typo from "passeord" to "password"
    validate: {
      validator: function (password) {
        // check if password and password confirm are equal
        return this.password === password; // Simplified the if else structure for direct comparison
      },
      message: "Password and confirmPassword are different!",
    },
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
});

// Hashing newly created and modified passwords
userSchema.pre("save", async function (next) {
  const user = this;

  // Hash the newly created and modified passwords
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10); // 10 is the number of rounds the hash algorithm must execute
  }

  // Deletes the confirmPassword field so it's not persisted in the database
  user.confirmPassword = undefined;

  next();
});

// Generates a reset token for reseting password
userSchema.methods.createPasswordResetToken = function () {
  // Creates the reset token
  const resetToken = crypto.randomBytes(32).toString("hex");

  // Hash the token
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  console.log({ resetToken }, this.passwordResetToken);

  // Valid for 10 minutes -- more than 10 beacuse dates are wrong on computer
  this.passwordResetExpires = Date.now() + 10 * 60 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
