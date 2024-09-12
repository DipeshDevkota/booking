const jwt = require('jsonwebtoken');
const { promisify }= require('util');
const User = require('../model/User.model');
const JWT_SECRET = process.env.SECRET_KEY;

const isAuthenticated = async(req,res,next)=>{
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({
                message:'You are not logged in(token invalid)!'
            });
        }


        const decoded= await promisify(jwt.verify)(jwttoken,JWT_SECRET);

        const user = await User.findById(decoded.id);

        if(!user){
            return res.status(401).json({
                message:"User doesn't exist"
            });
        }

        req.user= user;
        req.userId= user._id;

        next();
        
    } catch (err) {
        console.error(err);
        return res.status(401).json({
            message:'Authentication failed'
        });

        
    }
}

module.exports={isAuthenticated}