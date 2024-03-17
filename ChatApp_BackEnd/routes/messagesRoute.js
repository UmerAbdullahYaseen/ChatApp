const express = require('express');
const router = express.Router();
const { sendMessage, getMessages, deleteMessages } = require('../controller/messageController');
const { authenticateUser } = require('../middleware/authMiddleware');

// Routes
router.post('/:channelId/messages',authenticateUser, sendMessage);
router.get('/:channelId', authenticateUser, getMessages);
router.delete('/:messageId', authenticateUser, deleteMessages);

module.exports = router;