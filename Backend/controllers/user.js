const user = require('../models/user')
console.log(user)
const asyncHandler = require('express-async-handler')

const userRegister = asyncHandler(async(req,res)=>{
    const userexist = await user.findOne({email:req.body.email})
    if(userexist) throw new Error('email already exists')
    try{
         userdata = req.body
         adduser = await user.create(userdata)
        res.json(adduser)
    }catch(err){
        console.log(err)
        res.json(err)
    }
})

const userLogin = asyncHandler(async(req,res)=>{
    const {email,password} = req.body
    const userdata = await user.findOne({email:email})
    if(userdata && (await userdata.isPasswordMatched(password))){
        res.json(userdata)
    }else{
        res.status(401)
        throw new Error('invalid login credentials')
    }
})

module.exports = {
    userRegister,
    userLogin
}