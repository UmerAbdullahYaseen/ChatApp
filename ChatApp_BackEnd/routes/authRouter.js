<<<<<<< HEAD
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
=======
const express = require('express');
const router = express.Router();
const { register, login, allusers, forgotPassword, resetPassword, deleteUser } = require('../controller/authController');
const { authenticateUser } = require('../middleware/authMiddleware');

// Routes
router.post('/register', register);
router.get('/login', login);
router.delete('/:userId',authenticateUser, deleteUser);
router.get('/allusers',allusers);


//update user
//router.post('/forgot-password', forgotPassword);
//router.post('/reset-password/:token', resetPassword);


module.exports = router;
>>>>>>> origin/master
