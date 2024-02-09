const express = require('express');
const router = express.Router();
const { createChannel, getChannels, getChannelDetails } = require('../controller/channelController');
//const { authenticateUser } = require('../middleware/authMiddleware');

// Routes
router.post('/create'/* , authenticateUser */, createChannel);
router.get('/'/* , authenticateUser */, getChannels);
router.get('/:channelId'/* , authenticateUser */, getChannelDetails);

module.exports = router;