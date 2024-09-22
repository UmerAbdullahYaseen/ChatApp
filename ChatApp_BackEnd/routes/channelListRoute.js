const express = require('express');
const router = express.Router();
const { createChannel, getChannels, getChannelDetails, deleteChannel, updateChannel } = require('../controller/channelController');
const { authenticateUser } = require('../middleware/authMiddleware');


/**
 * @swagger
 * tags:
 *   name: Channels
 *   description: Channel management
 */

// Routes
// List all channels
/**
 * @swagger
 * /api/channels/channels:
 *   get:
 *     summary: Get all channels
 *     description: Retrieve a list of all available communication channels. This endpoint requires authentication via JWT token.
 *     tags: [Channels]
 *     security:
 *       - BearerAuth: []  # Requires JWT token
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         description: 'Bearer token for authorization. Example: Bearer {token}'
 *         schema:
 *           type: string
 *           example: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
 *     responses:
 *       200:
 *         description: List of channels retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 channels:
 *                   type: array
 *                   description: List of available channels
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         description: Name of the channel
 *                         example: "general"
 *                       description:
 *                         type: string
 *                         description: Short description of the channel
 *                         example: "General discussion channel"
 *                       _id:
 *                         type: string
 *                         description: Unique identifier for the channel
 *                         example: "66e84eb997785085f2a21cc3"
 *                       createdBy:
 *                         type: string
 *                         description: The ID of the user who created the channel
 *                         example: "66dba762f1af3c684553eaa3"
 *                       members:
 *                         type: array
 *                         description: List of members in the channel
 *                         items:
 *                           type: string
 *                         example: []
 *                       timestamp:
 *                         type: string
 *                         format: date-time
 *                         description: The timestamp when the channel was created
 *                         example: "2024-09-16T15:28:57.772Z"
 *       401:
 *         description: Unauthorized. JWT token is missing or invalid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized: No token provided"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error, please try again later."
 */
router.get('/channels', authenticateUser, getChannels);

/**
 * @swagger
 * /api/channels/channels:
 *   post:
 *     summary: Create a new channel
 *     description: This endpoint creates a new communication channel for users. The name of the channel must be unique.
 *     tags: [Channels]
 *     security:
 *       - BearerAuth: []  # Reference to BearerAuth scheme
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         description: 'Bearer token for authorization. Example: Bearer {token}'
 *         schema:
 *           type: string
 *           example: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the channel (must be unique).
 *                 example: "exampleChannel11"
 *               description:
 *                 type: string
 *                 description: A brief description of what the channel is about.
 *                 example: "example_channel_11"
 *     responses:
 *       201:
 *         description: Channel created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 channel:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       description: Name of the created channel.
 *                       example: "exampleChannel11"
 *                     description:
 *                       type: string
 *                       description: Description of the channel.
 *                       example: "example_channel_11"
 *                     createdBy:
 *                       type: string
 *                       description: The ID of the user who created the channel.
 *                       example: "66dba762f1af3c684553eaa3"
 *                     members:
 *                       type: array
 *                       description: List of members in the channel.
 *                       items:
 *                         type: string
 *                       example: []
 *                     _id:
 *                       type: string
 *                       description: Unique ID of the created channel.
 *                       example: "66e84eb997785085f2a21cc3"
 *                     timestamp:
 *                       type: string
 *                       format: date-time
 *                       description: The timestamp when the channel was created.
 *                       example: "2024-09-16T15:28:57.772Z"
 *                     __v:
 *                       type: integer
 *                       example: 0
 *                 links:
 *                   type: object
 *                   properties:
 *                     self:
 *                       type: string
 *                       description: Link to the created channel.
 *                       example: "/api/channels/channels/66e84eb997785085f2a21cc3"
 *                     allChannels:
 *                       type: string
 *                       description: Link to fetch all channels.
 *                       example: "/api/channels/channels"
 *       400:
 *         description: Channel name already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Channel name already exists"
 *       401:
 *         description: Unauthorized. JWT token is missing or invalid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized: No token provided"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error, please try again later."
 */
// Create a new channel
router.post('/channels', authenticateUser, createChannel);

/**
 * @swagger
 * /api/channels/channels/{channelId}:
 *   get:
 *     summary: Get channel details
 *     description: Retrieve details of a specific communication channel by its ID. This endpoint requires authentication via JWT token.
 *     tags: [Channels]
 *     security:
 *       - BearerAuth: []  # Requires JWT token
 *     parameters:
 *       - in: path
 *         name: channelId
 *         required: true
 *         description: Channel ID to retrieve
 *         schema:
 *           type: string
 *           example: "66a7df8b8186d156da4d49fe"
 *       - in: header
 *         name: Authorization
 *         required: true
 *         description: 'Bearer token for authorization. Example: Bearer {token}'
 *         schema:
 *           type: string
 *           example: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
 *     responses:
 *       200:
 *         description: Channel details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 channel:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: Unique identifier for the channel
 *                       example: "66a7df8b8186d156da4d49fe"
 *                     name:
 *                       type: string
 *                       description: Name of the channel
 *                       example: "Test Channel 211ss"
 *                     description:
 *                       type: string
 *                       description: A short description of the channel
 *                       example: "Channel description 211ss"
 *                     createdBy:
 *                       type: string
 *                       description: The ID of the user who created the channel
 *                       example: "66a14ac0ecc5bdc5ea536928"
 *                     members:
 *                       type: array
 *                       description: List of members in the channel
 *                       items:
 *                         type: string
 *                       example: []
 *                     timestamp:
 *                       type: string
 *                       format: date-time
 *                       description: Timestamp when the channel was created
 *                       example: "2024-07-29T18:29:31.949Z"
 *                     __v:
 *                       type: integer
 *                       description: Version key for the channel document
 *                       example: 0
 *                 links:
 *                   type: object
 *                   properties:
 *                     self:
 *                       type: string
 *                       description: URL to access the current channel details
 *                       example: "/api/channels/channels/66a7df8b8186d156da4d49fe"
 *                     update:
 *                       type: string
 *                       description: URL to update the current channel
 *                       example: "/api/channels/channels/66a7df8b8186d156da4d49fe"
 *                     delete:
 *                       type: string
 *                       description: URL to delete the current channel
 *                       example: "/api/channels/channels/66a7df8b8186d156da4d49fe"
 *       401:
 *         description: Unauthorized. JWT token is missing or invalid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized: No token provided"
 *       404:
 *         description: Channel not found. This response indicates that no channel with the given ID exists.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Channel not found"
 *       500:
 *         description: Internal Server Error. An unexpected error occurred while processing the request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error, please try again later."
 */

// Get channel details by channelId
router.get('/channels/:channelId', authenticateUser, getChannelDetails);

/**
 * @swagger
 * /api/channels/channels/{channelId}:
 *   put:
 *     summary: Update a channel
 *     description: Update the details of a specific channel using its ID. Requires authentication via JWT token.
 *     tags: [Channels]
 *     security:
 *       - BearerAuth: []  # Requires JWT token
 *     parameters:
 *       - in: path
 *         name: channelId
 *         required: true
 *         description: Channel ID to update
 *         schema:
 *           type: string
 *           example: "66a7df8b8186d156da4d49fe"
 *       - in: header
 *         name: Authorization
 *         required: true
 *         description: 'Bearer token for authorization. Example: Bearer {token}'
 *         schema:
 *           type: string
 *           example: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Channel Name"
 *               description:
 *                 type: string
 *                 example: "Updated channel description"
 *     responses:
 *       200:
 *         description: Channel updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Channel updated successfully"
 *                 links:
 *                   type: object
 *                   properties:
 *                     self:
 *                       type: string
 *                       description: URL to access the updated channel
 *                       example: "/api/channels/channels/66a7df8b8186d156da4d49fe"
 *                     allChannels:
 *                       type: string
 *                       description: URL to access all channels
 *                       example: "/api/channels/channels"
 *       400:
 *         description: Invalid channel ID. This response is returned when the provided channel ID is not valid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid channel ID"
 *       404:
 *         description: Channel not found. This response indicates that no channel with the given ID exists.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Channel not found"
 *       500:
 *         description: Internal Server Error. An unexpected error occurred while processing the request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error, please try again later."
 */

// Update a channel by channelId
router.put('/channels/:channelId', authenticateUser, updateChannel);

/**
 * @swagger
 * /api/channels/channels/{channelId}:
 *   delete:
 *     summary: Delete a channel
 *     description: Permanently delete a channel using its ID. Requires authentication via JWT token.
 *     tags: [Channels]
 *     security:
 *       - BearerAuth: []  # Requires JWT token
 *     parameters:
 *       - in: path
 *         name: channelId
 *         required: true
 *         description: Channel ID to delete
 *         schema:
 *           type: string
 *           example: "66a7df8b8186d156da4d49fe"
 *       - in: header
 *         name: Authorization
 *         required: true
 *         description: 'Bearer token for authorization. Example: Bearer {token}'
 *         schema:
 *           type: string
 *           example: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
 *     responses:
 *       200:
 *         description: Channel deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Channel deleted successfully"
 *                 links:
 *                   type: object
 *                   properties:
 *                     self:
 *                       type: string
 *                       description: URL to access the deleted channel (if applicable)
 *                       example: "/api/channels/channels/66a7df8b8186d156da4d49fe"
 *                     allChannels:
 *                       type: string
 *                       description: URL to access all channels
 *                       example: "/api/channels/channels"
 *       404:
 *         description: Channel not found. This response indicates that no channel with the given ID exists.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Channel not found"
 *       500:
 *         description: Internal Server Error. An unexpected error occurred while processing the request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error, please try again later."
 */
// Delete a channel by channelId
router.delete('/channels/:channelId', authenticateUser, deleteChannel);

module.exports = router;    