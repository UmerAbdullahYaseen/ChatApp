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