const ArchiveMessage = require("../model/ArchivedMessageModel");
const ArchivedMessage = require("../model/ArchivedMessageModel");
const Message = require("../model/messagesInChannel");

const archiveMessagesToMongoDB = async (messages) => {
  try {
    const archivedMessages = messages.map((message) => ({
      channelId: message.channel,
      userId: message.user,
      content: message.content,
      createdAt: message.timestamp,
    }));

    // Insert archived messages into the MongoDB collection
    await ArchivedMessage.insertMany(archivedMessages);
    console.log("Messages archived in MongoDB.");
  } catch (error) {
    console.error("Error archiving messages to MongoDB:", error);
  }
};

const archiveOldMessages = async (channelId) => {
  try {
    // Get all messages for the given channel, sorted by creation date (most recent first)
    const messages = await Message.find({ channel: channelId }).sort({
      timestamp: -1,
    });
    // Check if message count exceeds 15
    if (messages.length > 15) {
      // Get the old messages (all except the most recent 15)
      const oldMessages = messages.slice(15);
      // Archive old messages to MongoDB
      await archiveMessagesToMongoDB(oldMessages);
      // Get IDs of the old messages to delete
      const oldMessageIds = oldMessages.map((msg) => msg._id);
      // Delete old messages from the current database
      await Message.deleteMany({ _id: { $in: oldMessageIds } });
    }
  } catch (error) {
    console.error("Error archiving messages:", error);
  }
};

const deleteArchiveMessages = async (channelId) =>{
  const checkArchiveMessage = await ArchiveMessage.find({channelId})
  if(!checkArchiveMessage){
   return
  }
  else{
    await ArchiveMessage.deleteMany({channelId})
  }
  return
}

module.exports = {
  archiveMessagesToMongoDB,
  archiveOldMessages,
  deleteArchiveMessages
};
