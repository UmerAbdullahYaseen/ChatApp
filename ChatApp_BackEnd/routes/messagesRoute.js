const express = require('express');
const router = express.Router();
const { sendMessage, getMessages, deleteMessages, getMessage, clearChannelMessages, updateMessage } = require('../controller/messageController');
const { authenticateUser } = require('../middleware/authMiddleware');

// Routes
/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: Message management in channels
 */

/**
 * @swagger
 * /api/messages/channels/{channelId}/messages:
 *   get:
 *     summary: Get all messages in a channel
 *     description: Retrieves all messages in the specified channel. The channel ID is required to fetch the messages.
 *     tags: [Messages]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: channelId
 *         in: path
 *         required: true
 *         description: ID of the channel to fetch messages
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
 *         description: List of messages retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 messages:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "66db4165ed27a8291bf40a1d"
 *                       channel:
 *                         type: string
 *                         example: "66a7df8b8186d156da4d49fe"
 *                       user:
 *                         type: string
 *                         example: "66d5cbe45816c94c95c81e17"
 *                       content:
 *                         type: string
 *                         example: "This is a sample message."
 *                       timestamp:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-09-06T17:52:37.422Z"
 *                       __v:
 *                         type: integer
 *                         example: 0
 *                 links:
 *                   type: object
 *                   properties:
 *                     self:
 *                       type: string
 *                       description: URL to access the messages in the channel
 *                       example: "/api/channels/66a7df8b8186d156da4d49fe/messages"
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

// Get all messages in a specific channel
router.get('/channels/:channelId/messages' , authenticateUser, getMessages);

/**
 * @swagger
 * /api/messages/channels/{channelId}/messages:
 *   post:
 *     summary: Send a message to a channel
 *     description: Sends a message to the specified channel. The message content is required.
 *     tags: [Messages]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: channelId
 *         in: path
 *         required: true
 *         description: ID of the channel to send the message
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
 *               content:
 *                 type: string
 *                 example: "Hello, this is a message!"
 *     responses:
 *       201:
 *         description: Message sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 messages:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "66db4165ed27a8291bf40a1d"
 *                       channel:
 *                         type: string
 *                         example: "66a7df8b8186d156da4d49fe"
 *                       user:
 *                         type: string
 *                         example: "66d5cbe45816c94c95c81e17"
 *                       content:
 *                         type: string
 *                         example: "asdasd"
 *                       timestamp:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-09-06T17:52:37.422Z"
 *                       __v:
 *                         type: integer
 *                         example: 0
 *                 links:
 *                   type: object
 *                   properties:
 *                     self:
 *                       type: string
 *                       description: URL to access the messages in the channel
 *                       example: "/api/messages/channels/66a7df8b8186d156da4d49fe/messages"
 *                     sendMessage:
 *                       type: string
 *                       description: URL to send a message to the channel
 *                       example: "/api/messages/channels/66a7df8b8186d156da4d49fe/messages"
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

// Send a message to a specific channel
router.post('/channels/:channelId/messages', authenticateUser, sendMessage);

/**
 * @swagger
 * /api/messages/channels/{channelId}/messages/{messageId}:
 *   delete:
 *     summary: Delete a message
 *     description: Deletes a specific message identified by its ID from the specified channel.
 *     tags: [Messages]
 *     security:
 *       - BearerAuth: [] 
 *     parameters:
 *       - name: channelId
 *         in: path
 *         required: true
 *         description: ID of the channel containing the message
 *         schema:
 *           type: string
 *           example: "66a7df8b8186d156da4d49fe"
 *       - name: messageId
 *         in: path
 *         required: true
 *         description: ID of the message to delete
 *         schema:
 *           type: string
 *           example: "66db4165ed27a8291bf40a1d"
 *       - in: header
 *         name: Authorization
 *         required: true
 *         description: 'Bearer token for authorization. Example: Bearer {token}'
 *         schema:
 *           type: string
 *           example: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
 *     responses:
 *       200:
 *         description: Message deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Message deleted successfully."
 *                 links:
 *                   type: object
 *                   properties:
 *                     self:
 *                       type: string
 *                       example: "/api/channels/66a7df8b8186d156da4d49fe/messages/66db4165ed27a8291bf40a1d"
 *                     channel:
 *                       type: string
 *                       example: "/api/channels/66a7df8b8186d156da4d49fe/messages"
 *       404:
 *         description: Message not found. Indicates that the message with the specified ID does not exist.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Message not found."
 *       500:
 *         description: Internal Server Error. Indicates an unexpected error occurred while processing the request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error, please try again later."
 */

// Delete a specific message by messageId
router.delete('/channels/:channelId/messages/:messageId', authenticateUser, deleteMessages);

/**
 * @swagger
 * /api/messages/channels/{channelId}/messages:
 *   delete:
 *     summary: Delete all messages in a channel
 *     description: Deletes all messages from the specified channel. This action is irreversible.
 *     tags: [Messages]
 *     security:
 *       - BearerAuth: [] 
 *     parameters:
 *       - name: channelId
 *         in: path
 *         required: true
 *         description: ID of the channel from which to delete all messages
 *         schema:
 *           type: string
 *           example: "66a7df8b8186d156da4d49fe"
 *     responses:
 *       200:
 *         description: All messages deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "All messages deleted successfully."
 *                 links:
 *                   type: object
 *                   properties:
 *                     self:
 *                       type: string
 *                       example: "/api/channels/66a7df8b8186d156da4d49fe/messages"
 *                     channel:
 *                       type: string
 *                       example: "/api/channels/66a7df8b8186d156da4d49fe"
 *       404:
 *         description: Channel not found. Indicates that the channel with the specified ID does not exist.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Channel not found."
 *       500:
 *         description: Internal Server Error. Indicates an unexpected error occurred while processing the request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error, please try again later."
 */

// Delete all the messages from a channel at once
router.delete('/channels/:channelId/messages', authenticateUser, clearChannelMessages);

/**
 * @swagger
 * /api/messages/channels/{channelId}/messages/{messageId}:
 *   get:
 *     summary: Get a specific message by ID
 *     tags: [Messages]
 *     security:
 *       - BearerAuth: [] 
 *     parameters:
 *       - name: channelId
 *         in: path
 *         required: true
 *         description: ID of the channel
 *         schema:
 *           type: string
 *           example: "66a7df8b8186d156da4d49fe"
 *       - name: messageId
 *         in: path
 *         required: true
 *         description: ID of the message to fetch
 *         schema:
 *           type: string
 *           example: "66db4165ed27a8291bf40a1d"
 *     responses:
 *       200:
 *         description: Message retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "66db4165ed27a8291bf40a1d"
 *                 content:
 *                   type: string
 *                   example: "This is a sample message."
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-09-06T17:52:37.422Z"
 *       404:
 *         description: Message not found. Indicates that the message with the specified ID does not exist.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Message not found."
 *       404:
 *         description: Channel not found. Indicates that the channel with the specified ID does not exist, even if the message exists.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Channel not found."
 *       500:
 *         description: Internal Server Error. Indicates an unexpected error occurred while processing the request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error, please try again later."
 */


//Get a specific message by its ID
router.get('/channels/:channelId/messages/:messageId', authenticateUser, getMessage);

/**
 * @swagger
 * /api/messages/channels/{channelId}/messages/{messageId}:
 *   put:
 *     summary: Update a specific message by ID
 *     tags: [Messages]
 *     security:
 *       - BearerAuth: [] 
 *     parameters:
 *       - name: channelId
 *         in: path
 *         required: true
 *         description: ID of the channel
 *         schema:
 *           type: string
 *           example: "66a7df8b8186d156da4d49fe"
 *       - name: messageId
 *         in: path
 *         required: true
 *         description: ID of the message to update
 *         schema:
 *           type: string
 *           example: "66db4165ed27a8291bf40a1d"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 example: "Updated message content"
 *     responses:
 *       200:
 *         description: Message updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "66db4165ed27a8291bf40a1d"
 *                     channel:
 *                       type: string
 *                       example: "66a7df8b8186d156da4d49fe"
 *                     user:
 *                       type: string
 *                       example: "66d5cbe45816c94c95c81e17"
 *                     content:
 *                       type: string
 *                       example: "Updated message content1111"
 *                     timestamp:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-09-06T17:52:37.422Z"
 *                     __v:
 *                       type: integer
 *                       example: 0
 *                 links:
 *                   type: object
 *                   properties:
 *                     self:
 *                       type: string
 *                       example: "/api/messages/channels/66a7df8b8186d156da4d49fe/messages/66db4165ed27a8291bf40a1d"
 *                     channelMessages:
 *                       type: string
 *                       example: "/api/channels/66a7df8b8186d156da4d49fe/messages"
 *       404:
 *         description: Message not found. Indicates that the message with the specified ID does not exist.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Message not found."
 *       404:
 *         description: Channel not found. Indicates that the channel with the specified ID does not exist.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Channel not found."
 *       403:
 *         description: User not authorized to update this message. Indicates that the authenticated user does not own the message.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "You are not authorized to edit this message."
 *       500:
 *         description: Internal Server Error. Indicates an unexpected error occurred while processing the request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error, please try again later."
 */


// Update a message by the messageID
router.put('/channels/:channelId/messages/:messageId', authenticateUser, updateMessage);

module.exports = router;
