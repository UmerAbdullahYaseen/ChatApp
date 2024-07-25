<<<<<<< HEAD
const express = require('express');
const router = express.Router();
const { sendMessage, getMessages, deleteMessages } = require('../controller/messageController');
const { authenticateUser } = require('../middleware/authMiddleware');

// Routes
// Get all messages in a specific channel
router.get('/channels/:channelId/messages' , authenticateUser, getMessages);

// Send a message to a specific channel
router.post('/channels/:channelId/messages', authenticateUser, sendMessage);

// Delete a specific message by messageId
router.delete('/messages/:messageId', authenticateUser, deleteMessages);

module.exports = router;
=======
const express = require('express');
const router = express.Router();
const { sendMessage, getMessages, deleteMessages } = require('../controller/messageController');
const { authenticateUser } = require('../middleware/authMiddleware');

// Routes
router.post('/:channelId/messages',authenticateUser, sendMessage);
router.get('/:channelId', authenticateUser, getMessages);
router.delete('/:messageId', authenticateUser, deleteMessages);

module.exports = router;
>>>>>>> origin/master
