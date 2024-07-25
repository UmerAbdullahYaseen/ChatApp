const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 30, 
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true, 
        validate: {
            validator: isEmail, 
            message: 'Invalid email format', 
        },
    },
    password: {
        type: String,
        required: true,
        minlength: 6, 
        maxlength: 100, 
       
        validate: {
            validator: function (value) {
                
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
userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password); 
};

const User = mongoose.model('User', userSchema);
module.exports = User;
