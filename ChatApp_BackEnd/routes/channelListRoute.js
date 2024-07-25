<<<<<<< HEAD
const express = require('express');
const router = express.Router();
const { createChannel, getChannels, getChannelDetails, deleteChannel, updateChannel } = require('../controller/channelController');
const { authenticateUser } = require('../middleware/authMiddleware');

// Routes
// List all channels
router.get('/channels', authenticateUser, getChannels);
// Create a new channel
router.post('/channels', authenticateUser, createChannel);
// Get channel details by channelId
router.get('/channels/:channelId', authenticateUser, getChannelDetails);
// Update a channel by channelId
router.put('/channels/:channelId', authenticateUser, updateChannel);
// Delete a channel by channelId
router.delete('/channels/:channelId', authenticateUser, deleteChannel);

=======
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

>>>>>>> origin/master
module.exports = router;