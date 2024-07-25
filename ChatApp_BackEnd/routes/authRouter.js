const express = require('express');
const router = express.Router();
const { register, login, allusers, forgotPassword, resetPassword, deleteUser, getUser } = require('../controller/authController');
const { authenticateUser } = require('../middleware/authMiddleware');

// Routes
router.post('/users', register); // Create a user
router.get('/users', allusers); // List all users
router.post('/login', login); // User login
router.get('/allusers/:userId', authenticateUser, getUser);
router.delete('/users/:userId', authenticateUser, deleteUser); // Delete a user

module.exports = router;
