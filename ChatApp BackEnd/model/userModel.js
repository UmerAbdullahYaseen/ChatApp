const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true, // Remove whitespace from both ends of the string
        minlength: 3, // Minimum length of the username
        maxlength: 30, // Maximum length of the username
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true, // Convert email to lowercase
        validate: {
            validator: isEmail, // Validate email format using validator library
            message: 'Invalid email format', // Custom error message
        },
    },
    password: {
        type: String,
        required: true,
        minlength: 6, // Minimum length of the password
        maxlength: 100, // Maximum length of the password
        // Use a custom validator function to enforce password complexity
        validate: {
            validator: function (value) {
                // At least one lowercase letter, one uppercase letter, one digit, and one special character
                return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,}$/.test(value);
            },
            message: 'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character',
        },
    },
    isUserOnline: {
        type: Boolean,
        default: false,
    },
    resetPasswordToken: String, 
    resetPasswordExpires: Date,
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

/* userSchema.pre('save', async function (next) {
    try {
        if (this.isModified('password')) {
            console.log('Hashing password...');
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
        }
        next();
    } catch (error) {
        console.error('Error hashing password:', error);
        next(error);
    }
}); */

// Method to compare passwords during authentication
userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password); // Compare the provided password with the hashed password
};

const User = mongoose.model('User', userSchema);
module.exports = User;
