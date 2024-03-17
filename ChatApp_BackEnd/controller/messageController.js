// messageController.js
const Message = require('../model/messagesInChannel');

// Send a message to a channel
exports.sendMessage = async (req, res) => {
    try {
        const { channelId } = req.params;
        const { content } = req.body;
        const userId = req.user._id; // Assuming the authenticated user is stored in req.user
        const newMessage = await Message.create({ channel: channelId, user: userId, content });
        res.status(201).json({ message: newMessage });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get messages for a specific channel
exports.getMessages = async (req, res) => {
    try {
        const { channelId } = req.params;
        const messages = await Message.find({ channel: channelId });
        res.json({ messages });
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// delete message within a specific channel
exports.deleteMessages = async (req, res) => {
    try{
        const {messageId} = req.params;
        //find message through id and delete it
        await Message.findByIdAndDelete(messageId);
        res.status(200).json({message:"Message has been deleted successfully"})

    } catch(error){
        console.error('Error while deleting messages:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}