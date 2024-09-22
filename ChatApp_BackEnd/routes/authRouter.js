const express = require('express');
const router = express.Router();
const { register, login, allusers, deleteUser, getUser } = require('../controller/authController');
const { authenticateUser } = require('../middleware/authMiddleware');
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User authentication and management
 */

// Routes
/**
 * @swagger
 * /api/auth/users:
 *   post:
 *     summary: Register a new user
 *     description: This endpoint allows a new user to register by providing their username, email, and password. A successful registration will create a new user account in the system. The user will receive a confirmation response upon successful account creation. If the user already exists or if there is an error in the request, appropriate error messages will be returned.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: A unique username chosen by the user. The username must be between 3 and 20 characters long and may contain letters, numbers, and underscores.
 *                 example: johndoe 
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user. It must be a valid email format and unique in the system.
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 description: A secure password for the user's account. The password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.
 *                 example: Password123
 *     responses:
 *       201:
 *         description: User created successfully. This response indicates that the user has been successfully registered and can now log in to the application.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     username:
 *                       type: string
 *                       example: johndoe1
 *                     email:
 *                       type: string
 *                       example: johndoe1@example.com
 *                     password:
 *                       type: string
 *                       description: The hashed password for security. This will not be returned in a real application.
 *                       example: "ByCript Password"
 *                     isUserOnline:
 *                       type: boolean
 *                       example: false
 *                     _id:
 *                       type: string
 *                       example: 66e60991f7efe2b7ae73c0
 *                     timestamp:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-09-14T22:09:21.516Z"
 *                     __v:
 *                       type: integer
 *                       example: 0
 *                 message:
 *                   type: string
 *                   example: "User created successfully"
 *                 links:
 *                   type: object
 *                   properties:
 *                     self:
 *                       type: string
 *                       example: "/api/auth/users/66e60991f7efe2b7ae73c"
 *                     login:
 *                       type: string
 *                       example: "/api/auth/login"
 *                     allUsers:
 *                       type: string
 *                       example: "/api/auth/users"
 *       400:
 *         description: User already exists. This response indicates that the username or email provided is already in use by another account.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User with this username or email already exists."
 *       422:
 *         description: Validation error. This response indicates that the request body did not meet validation criteria (e.g., missing required fields, invalid email format).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Validation error: username must be at least 3 characters long."
 *       500:
 *         description: Internal Server Error. This response indicates that an unexpected error occurred on the server while processing the request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error, please try again later."
 */

router.post('/users', register); // Create a user


/**
 * @swagger
 * /api/auth/users:
 *   get:
 *     summary: List all users
 *     description: This endpoint retrieves a list of all registered users in the system. It returns an array of user objects and links for related actions, such as registration.
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Successful retrieval of users. This response includes an array of user objects and related links.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       username:
 *                         type: string
 *                         example: "johndoe1"
 *                       email:
 *                         type: string
 *                         example: "johndoe1@example.com"
 *                       isUserOnline:
 *                         type: boolean
 *                         example: false
 *                       _id:
 *                         type: string
 *                         example: "66e6099..."
 *                       timestamp:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-09-14T22:09:21.516Z"
 *                       __v:
 *                         type: integer
 *                         example: 0
 *                 links:
 *                   type: object
 *                   properties:
 *                     self:
 *                       type: string
 *                       example: "/api/auth/users"
 *                     register:
 *                       type: string
 *                       example: "/api/auth/users"
 *       500:
 *         description: Internal Server Error. This response indicates that an unexpected error occurred on the server while processing the request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error, please try again later."
 */

router.get('/users', allusers); // List all users

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     description: This endpoint allows users to log in to their accounts by providing their email and password. A successful login will return a token for authenticated access and the user's email without exposing sensitive information.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address associated with the user account.
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 description: The password for the user account.
 *                 example: Password123
 *     responses:
 *       200:
 *         description: Successful login. This response includes an authentication token, user information, and links for further actions.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: The authentication token to be used in future requests.
 *                   example: "eyJhbGciOiJIUzI..."
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The unique identifier for the user.
 *                       example: "66e60..."
 *                     email:
 *                       type: string
 *                       description: The email address of the user.
 *                       example: "johndoe@example.com"
 *                 links:
 *                   type: object
 *                   properties:
 *                     self:
 *                       type: string
 *                       example: "/api/auth/login"
 *                     user:
 *                       type: string
 *                       example: "/api/auth/users/66e6097d..."
 *       404:
 *         description: User not found. This response indicates that the provided email does not match any account in the system.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User not found."
 *       400:
 *         description: User already exists. This response indicates that a user with the provided email or username is already registered in the system.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User already exists."
 *       401:
 *         description: Invalid credentials. This response indicates that the email and password combination provided is incorrect.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid credentials."
 *       500:
 *         description: Internal Server Error. This response indicates that an unexpected error occurred on the server while processing the request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error, please try again later."
 */

router.post('/login', login); // User login

/**
 * @swagger
 * /api/auth/users/{userId}:
 *   get:
 *     summary: Get user details
 *     description: This endpoint retrieves the details of a specific user by their user ID. It returns the user's profile information if found, or an error if the user does not exist.
 *     tags: [Auth]
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: ID of the user to fetch
 *         schema:
 *           type: string
 *       - name: Authorization
 *         in: header
 *         required: true
 *         description: Bearer token for user authentication. Use the token received during the login process.
 *         schema:
 *           type: string
 *           example: "Bearer eyJhbGciOiJIU..."
 *     security:
 *       - BearerAuth: [] 
 *     responses:
 *       200:
 *         description: User details retrieved successfully. This response includes the user's information such as username, email, and account status.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     username:
 *                       type: string
 *                       example: "johndoe1"
 *                     email:
 *                       type: string
 *                       example: "johndoe1@example.com"
 *                     isUserOnline:
 *                       type: boolean
 *                       example: false
 *                     _id:
 *                       type: string
 *                       example: "66e60991f7efe2b7ae73c01a"
 *                     timestamp:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-09-14T22:09:21.516Z"
 *                     __v:
 *                       type: integer
 *                       example: 0
 *       404:
 *         description: User not found. This response indicates that the user with the specified ID does not exist in the system.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User not found."
 *       500:
 *         description: Internal Server Error. This response indicates that an unexpected error occurred on the server while processing the request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error, please try again later."
 */
router.get('/users/:userId', authenticateUser, getUser); //Get user details

/**
 * @swagger
 * /api/auth/users/{userId}:
 *   delete:
 *     summary: Delete a user
 *     description: This endpoint allows an authorized user to delete a specific user account by providing the user ID. This action is irreversible and will permanently remove the user's account and associated data.
 *     tags: [Auth]
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: ID of the user to delete
 *         schema:
 *           type: string
 *       - name: Authorization
 *         in: header
 *         required: true
 *         description: Bearer token for user authentication. Use the token received during the login process.
 *         schema:
 *           type: string
 *           example: "Bearer eyJhbGciOiJIU..."
 *     security:
 *       - BearerAuth: []  # This tells Swagger that the endpoint requires JWT authentication
 *     responses:
 *       200:
 *         description: User deleted successfully. This response indicates that the user account has been removed from the system.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User deleted successfully."
 *       404:
 *         description: User not found. This response indicates that the user with the specified ID does not exist in the system.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User not found."
 *       401:
 *         description: Unauthorized. This response indicates that the request did not include a valid Bearer token or that the user does not have sufficient permissions.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized: No token provided or invalid token."
 *       500:
 *         description: Internal Server Error. This response indicates that an unexpected error occurred on the server while processing the request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error, please try again later."
 */

router.delete('/users/:userId', authenticateUser, deleteUser); // Delete the user

module.exports = router;
