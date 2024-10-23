const Channel = require("../model/channelListModel");
const mongoose = require("mongoose");
const { clearChannelMessages } = require("./messageController");

exports.createChannel = async (req, res) => {
  try {
    const { name, description } = req.body;
    const createdBy = req.user._id;
    const existingChannel = await Channel.findOne({ name });
    if (existingChannel) {
      return res.status(400).json({ error: "Channel name already exists" });
    }
    const newChannel = await Channel.create({ name, description, createdBy });
    res.status(201).json({
      channel: newChannel,
      links: {
        self: `/api/channels/channels/{channelId}`,
        allChannels: `/api/channels/channels`,
      },
    });
  } catch (error) {
    console.error("Error creating channel:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getChannels = async (req, res) => {
  try {
    const channels = await Channel.find();
    res.json({
      channels,
      links: {
        self: `/api/channels/channels`,
        createChannel: `/api/channels/channels`,
        deleteChannel: `/api/channels/channels/{channelId}`,
        channelMessages: `/api/messages/channels/{channelId}/messages`,
      },
      schemas: {
        createChannel: {
          type: "object",
          properties: {
            name: { type: "string" },
            description: { type: "string" },
          },
          required: ["name"],
        },
      },
    });
  } catch (error) {
    console.error("Error fetching channels:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getChannelDetails = async (req, res) => {
  try {
    const channelId = req.params.channelId;
    const channel = await Channel.findById(channelId);
    if (!channel) {
      return res.status(404).json({ error: "Channel not found" });
    }
    res.json({
      channel,
      links: {
        self: `/api/channels/channels/{channelId}`,
        update: `/api/channels/channels/{channelId}`,
        delete: `/api/channels/channels/{channelId}`,
      },
    });
  } catch (error) {
    console.error("Error fetching channel details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteChannel = async (req, res) => {
  try {
    const channelId = req.params.channelId;
    const deletedChannel = await Channel.findByIdAndDelete(channelId);
    if (!deletedChannel) {
      return res.status(404).json({ error: "Channel not found with this id" });
    }
    res.json({
      message: "Channel deleted successfully",
      links: {
        allChannels: `/api/channels/channels`,
      },
    });
  } catch (error) {
    console.error("Error while deleting channel:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateChannel = async (req, res) => {
  try {
    const channelId = req.params.channelId;
    if (!mongoose.Types.ObjectId.isValid(channelId)) {
      return res.status(400).json({ error: "Invalid channel ID" });
    }
    const { name, description } = req.body;
    const updatedChannel = await Channel.findByIdAndUpdate(
      channelId,
      { name, description },
      { new: true }
    );
    if (!updatedChannel) {
      return res.status(404).json({ error: "Channel not found with this id" });
    }
    res.json({
      message: "Channel updated successfully",
      links: {
        self: `/api/channels/channels/{channelId}`,
        allChannels: `/api/channels/channels`,
      },
    });
  } catch (error) {
    console.error("Error while updating channel:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
