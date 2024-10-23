// userModel.js
const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");
const { mainDBConnection } = require("../configuration/db"); // Ensure you're importing the correct connection

// Define user schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: isEmail,
        message: "Invalid email format",
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 100,
      validate: {
        validator: function (value) {
          return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,}$/.test(value);
        },
        message:
          "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character",
      },
    },
    isUserOnline: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  { timestamps: true }
);

// Create User model with the mainDBConnection
const User = mainDBConnection.model("User", userSchema); // Use mainDBConnection to define the model
module.exports = User;
