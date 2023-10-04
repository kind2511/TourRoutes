const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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
    required: [true, "Confirm your passeord"],
    validate: {
      validator: function (password) {
        // check if password and password confirm are equal
        if (this.password === password) {
          return true;
        } else {
          return false;
        }
      },
      message: "Password and confirmPassword are different!",
    },
  },
});

// Hasing newley created and modified passwords
userSchema.pre("save", async function (next) {
  const user = this;

  // Hashed newly created and modified passwords
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10); // 10 is number of rounds the hash algorithm must execute
  }

  // deletes the confirmedPassword field so it's not persisted in database
  user.confirmPassword = undefined;

  next();
});



const User = mongoose.model("User", userSchema);

module.exports = User;
