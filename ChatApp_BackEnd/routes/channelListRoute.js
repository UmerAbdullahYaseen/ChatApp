const express = require('express');
const router = express.Router();
const { createChannel, getChannels, getChannelDetails, deleteChannel, updateChannel } = require('../controller/channelController');
//const { authenticateUser } = require('../middleware/authMiddleware');
const { authenticateUser } = require('../middleware/authMiddleware');

// Routes
router.post('/create', authenticateUser, createChannel);
router.get('/', authenticateUser, getChannels);
router.get('/:channelId', authenticateUser, getChannelDetails);
router.delete('/:channelId', authenticateUser, deleteChannel);
router.put('/:channelId', authenticateUser, updateChannel);

module.exports = router;