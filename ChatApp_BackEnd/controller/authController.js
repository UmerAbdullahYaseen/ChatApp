const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");
const sendWelcomeEmail = require("../Services/emailService");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    res.status(201).json({
      user: newUser,
      message: "User created successfully",
      links: {
        self: `/api/auth/users/{userId}`,
        login: `/api/auth/login`,
        allUsers: `/api/auth/users`,
        allChannels: `/api/channels/channels`,
      },
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({ message: "Validation error", errors });
    }
    res.status(500).json({ message: error.message || "Server error" });
  }
};

const getUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      user,
      links: {
        self: `/api/auth/users/${user._id}`,
        delete: `/api/auth/users/${user._id}`,
        update: `/api/auth/users/${user._id}`,
      },
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ email: user.email, userId: user._id }, "qa", {
      expiresIn: "1h",
    });

    sendWelcomeEmail(user.email);

    res.status(200).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        // add other user details you might need
      },
      links: {
        self: `/api/auth/login`,
        user: `/api/auth/users/${user._id}`,
        allChannels: `/api/channels/channels`,
      },
    });
  } catch (error) {
    // Log the error to the console for debugging
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const allusers = async (req, res) => {
  try {
    const users = await User.find();
    res.json({
      users,
      links: {
        self: `/api/auth/users`,
        register: `/api/auth/users`,
      },
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    await User.findByIdAndDelete(userId);
    res.status(200).json({
      message: "User has been deleted successfully",
      links: {
        allUsers: `/api/auth/users`,
      },
    });
  } catch (error) {
    console.error("Error while deleting user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { register, login, allusers, deleteUser, getUser };
