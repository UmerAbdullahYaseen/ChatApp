const express = require('express');
const router = express.Router();
const { register, login, forgotPassword, resetPassword } = require('../controller/authController');

// Routes
router.post('/register', register);
router.get('/login', login);
//router.post('/forgot-password', forgotPassword);
//router.post('/reset-password/:token', resetPassword);


module.exports = router;
