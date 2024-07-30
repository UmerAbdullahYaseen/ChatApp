const Message = require('../model/messagesInChannel');

exports.sendMessage = async (req, res) => {
    try {
        const { channelId } = req.params;
        const { content } = req.body;
        const userId = req.user._id;
        const newMessage = await Message.create({ channel: channelId, user: userId, content });
        res.status(201).json({
            message: newMessage,
            links: {
                self: `/api/messages/${newMessage._id}`,
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
                self: `/api/channels/${channelId}/messages`,
                sendMessage: `/api/channels/${channelId}/messages`
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
                allMessages: `/api/channels/${req.params.channelId}/messages`
            }
        });
    } catch (error) {
        console.error('Error while deleting messages:', error);
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