<<<<<<< HEAD
const User = require('../model/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized: User not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Authentication Error:', error);
        return res.status(401).json({ message: 'Unauthorized: Token invalid or expired' });
    }
};

module.exports = { authenticateUser };
=======
const User = require('../model/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateUser = async (req,res,next) => {
    try{
        const token = req.headers.authorization;

        if(!token){
            return res.status(401).json({message:'Unauthorized'});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.userId);

        if(!user){
            return res.status(401).json({message:'Unauthorized'});
        }

        req.user = user;
        next();

    }catch(error){
        console.error('Authentication Error:', error);
        return res.status(401).json({message: 'Unauthorized'});
    }
}

module.exports = {authenticateUser};
>>>>>>> origin/master
