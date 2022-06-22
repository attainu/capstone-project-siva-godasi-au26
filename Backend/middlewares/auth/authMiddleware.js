const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const user = require('../../models/user');

const authMiddleware = asyncHandler(async(req,res,next)=>{
    let token;
    if(req.headers.authorization){
        try{
            token = req.headers.authorization
            if(token){
                const decoded = jwt.verify(token,process.env.JWTSECRET)
                //find the user by id
                const User = await user.findById(decoded.id).select('-password');
                // console.log(User)
                // //attach user to the request object
                req.User = User
                next();
            }
        }catch(err){
            throw new Error("Not authorized or token expired, login again")
        }
    }else{
       throw new Error('There is no token attached to the headers') 
    }
})

module.exports = authMiddleware