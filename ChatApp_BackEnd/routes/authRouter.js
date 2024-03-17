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
