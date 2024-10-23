// models/archivedMessage.js
const mongoose = require("mongoose");
const { archiveDBConnection } = require("../configuration/db");

const archivedMessageSchema = new mongoose.Schema({
  channelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Channel",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ArchiveMessage = archiveDBConnection.model(
  "ArchiveMessage",
  archivedMessageSchema
);
module.exports = ArchiveMessage;
