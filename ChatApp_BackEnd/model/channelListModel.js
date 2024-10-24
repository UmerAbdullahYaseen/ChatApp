const mongoose = require("mongoose");
const { mainDBConnection } = require("../configuration/db");

const channelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
    },
  ],
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Channel = mainDBConnection.model("Channel", channelSchema);
module.exports = Channel;
