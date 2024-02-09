const express = require('express');
const router = express.Router();
const { sendMessage, getMessages } = require('../controller/messageController');
//const { authenticateUser } = require('../middleware/authMiddleware');

// Routes
router.post('/:channelId',/*  authenticateUser, */ sendMessage);
router.get('/:channelId', /* authenticateUser, */ getMessages);

module.exports = router;