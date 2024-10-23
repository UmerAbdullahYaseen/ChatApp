const ArchivedMessage = require("../model/ArchivedMessageModel");

exports.getArchivedMessages = async (req, res) => {
  const { channelId } = req.params;
  try {
    // Fetch archived messages from MongoDB by channelId, sorted by creation date
    const archivedMessages = await ArchivedMessage.find({ channelId }).sort({
      createdAt: -1,
    });

    if (!archivedMessages.length) {
      return res.status(404).json({ message: "No archived messages found." });
    }

    // Construct response with hypermedia links
    res.status(200).json({
      archivedMessages,
      links: {
        self: `/api/archive/archived-messages/{channelId}`,
        allMessages: `/api/channels/{channelId}/messages`,
        clearArchivedMessages: `/api/archive/archived-messages/{channelId}/clear`,
      },
    });
  } catch (error) {
    console.error("Error fetching archived messages:", error);
    res.status(500).json({
      message: "Error fetching archived messages",
      error,
    });
  }
};
