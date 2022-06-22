const user = require('../models/user')
console.log(user)
const asyncHandler = require('express-async-handler')
const generateToken = require('../config/token/generateToken')
const validateMongodbId = require('../utils/validateMongodbId')

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
        res.json({
            token:generateToken(userdata._id)
        })
    }else{
        res.status(401)
        throw new Error('invalid login credentials')
    }
})

//fetch all users
const allusers = asyncHandler(async(req,res)=>{
    try{
        const users = await user.find({})
        res.json(users)
    }catch(err){
        console.log(err)
        res.json(err)
    }
})

const deleteuser = asyncHandler(async(req,res)=>{
    const{id} = req.params
    //check the id is vali or not
    validateMongodbId(id)
    try{
        const deleteduser = await user.findByIdAndDelete(id)
        res.json(deleteduser)
    }catch(err){
        console.log(err)
        res.json(err)
    }
}) 

const userdetails = asyncHandler(async(req,res)=>{
    const{id} = req.params
    //check the id is vali or not
    validateMongodbId(id)
    try{
        const userdetails = await user.findById(id)
        res.json(userdetails)
    }catch(err){
        console.log(err)
        res.json(err)
    }
})

const userProfile = asyncHandler(async(req,res)=>{
    const{id} = req.params
    //check the id is vali or not
    validateMongodbId(id)
    try{
        const myprofile = await user.findById(id)
        res.json(myprofile)
    }catch(err){
        console.log(err)
        res.json(err)
    }
})

//update user profile
const updateuser = asyncHandler(async(req,res)=>{
    const {_id} = req.User
    validateMongodbId(_id)
    const updatedata = req.body
    try{
        const userupdate = await user.findByIdAndUpdate(_id,updatedata)
        res.json(updateuser)
    }catch(err){
        console.log(err)
        res.json(err)
    }
})

module.exports = {
    userRegister,
    userLogin,
    allusers,
    deleteuser,
    userdetails,
    userProfile,
    updateuser
    
}