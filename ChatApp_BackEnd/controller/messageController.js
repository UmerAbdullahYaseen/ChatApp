const Message = require('../model/messagesInChannel');
const Channel = require('../model/channelListModel');

exports.sendMessage = async (req, res) => {
    try {
        const { channelId } = req.params;
        const { content } = req.body;
        const userId = req.user._id;
        const newMessage = await Message.create({ channel: channelId, user: userId, content });
        res.status(201).json({
            message: newMessage,
            links: {
                self: `/api/messages/channels/${newMessage._id}/messages`,
                channelMessages: `/api/channels/${channelId}/messages`
            }
        });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
  

exports.getMessages = async (req, res) => {
    try {
        const { channelId } = req.params;
        const messages = await Message.find({ channel: channelId });
        res.json({
            messages,
            links: {
                self: `/api/messages/channels/${channelId}/messages`,
                sendMessage: `/api/messages/channels/${channelId}/messages`,
            }
        });
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.deleteMessages = async (req, res) => {
    try {
        const { messageId } = req.params;
        await Message.findByIdAndDelete(messageId);
        res.status(200).json({
            message: "Message has been deleted successfully",
            links: {
                allMessages: `/api/channels/channels/${req.params.channelId}/messages`
            }
        });
    } catch (error) {
        console.error('Error while deleting messages:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.clearChannelMessages = async (req, res) => {
    try {
        const { channelId } = req.params;

        // Check if the channel exists
        const channelExists = await Channel.findById(channelId);
        if (!channelExists) {
            return res.status(404).json({ error: 'Channel not found' });
        }

        // Delete all messages in the channel
        await Message.deleteMany({ channel: channelId });

        res.status(200).json({
            message: 'All messages have been cleared from the channel',
            links: {
                self: `/api/messages/channels/${channelId}/clear`,
                channelMessages: `/api/channels/${channelId}/messages`
            }
        });
    } catch (error) {
        console.error('Error while clearing channel messages:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getMessage = async (req, res) => {
    try {
        const { channelId, messageId } = req.params;

        // Check if the channel exists
        const channelExists = await Channel.findById(channelId);
        if (!channelExists) {
            return res.status(404).json({ error: 'Channel not found' });
        }

        // Find the message
        const message = await Message.findOne({ _id: messageId, channel: channelId });
        if (!message) {
            return res.status(404).json({ error: 'Message not found' });
        }

        res.status(200).json({
            message: message,
            links: {
                self: `/api/messages/channels/${channelId}/messages/${messageId}`,
                channelMessages: `/api/channels/${channelId}/messages`
            }
        });
    } catch (error) {
        console.error('Error fetching message:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.updateMessage = async (req, res) => {
    try {
        const { channelId, messageId } = req.params;
        const { content } = req.body;
        const userId = req.user._id; // The authenticated user's ID

        // Check if the channel exists
        const channelExists = await Channel.findById(channelId);
        if (!channelExists) {
            return res.status(404).json({ error: 'Channel not found' });
        }

        // Find the message and ensure it belongs to the user
        const message = await Message.findOne({ _id: messageId, channel: channelId });

        if (!message) {
            return res.status(404).json({ error: 'Message not found' });
        }

        // Authorization check: only the message owner can update the message
        if (message.user.toString() !== userId.toString()) {
            return res.status(403).json({ error: 'You are not authorized to edit this message' });
        }

        // Use findByIdAndUpdate to update the message content
        const updatedMessage = await Message.findByIdAndUpdate(
            messageId,
            { content },
            { new: true } // This option returns the updated document
        );

        res.status(200).json({
            message: updatedMessage,
            links: {
                self: `/api/messages/channels/${channelId}/messages/${messageId}`,
                channelMessages: `/api/channels/${channelId}/messages`,
            }
        });
    } catch (error) {
        console.error('Error updating message:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


