import asyncHandler from 'express-async-handler';
import User from "../models/userModel.js"
import generateToken from "../utils/generateJsonWebToken.js"


// @desc    Authenticate user and get token
// @route   POST /api/USERS/login
// @access    Public

export const authUser =  asyncHandler( async (req, res)=>{

    const {email, password} = req.body
    const user = await User.findOne({email})
    if(user && (await user.matchPassword(password))){
         
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token : generateToken(user._id)
        })
    }else{
        res.status(404)
        throw new Error('Invalid email and passwod')
    }    
})

// @desc    get user profile
// @route   GET api/users/profile
// @access  Private

export const getUserProfile =  asyncHandler( async (req, res)=>{
    
    const user = await User.findById(req.user._id)
    if(user){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })

    }else{
        res.status(404)
        throw new Error('User not found!')
    }

})


// @desc    Register a user
// @route   POST /api/USERS
// @access    Public

export const registerUser =  asyncHandler( async (req, res)=>{

    const {name, email, password} = req.body
    const userExist = await User.findOne({email})
    if(userExist){
        res.status(400)
        throw new Error('User already exist')
    }

    const user = await User.create({
        name,
        email,
        password
    })
    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token : generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid user data!')
    }
})





// @desc    update user profile
// @route   PUT api/users/profile
// @access  Private

export const updateUserProfile =  asyncHandler( async (req, res)=>{
   
    const user = await User.findById(req.user._id)
    if(user){

        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if(req.body.password){
          user.password = req.body.password || user.password
        }  
        const updateUser = await user.save()
        res.json({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin,
            token : generateToken(updateUser._id)
        })

    }else{
        res.status(404)
        throw new Error('User not found!')
    }
})

// @desc    get all user 
// @route   GET api/users/
// @access  Private/Admin

export const getUsers =  asyncHandler( async (req, res)=>{
    
    const users = await User.find({})
    res.json(users)
})


// @desc    delete user 
// @route   GET api/users/:id
// @access  Private/Admin

export const deleteUser =  asyncHandler( async (req, res)=>{
    
    const user = await User.findById(req.params.id)
    if(user){
        await user.remove()
        res.json({message: 'User removed!'})
    }else{
        res.status(404)
        throw new Error("User does not exist! ")
    }
})


// @desc    get user by ID 
// @route   GET api/users/:id
// @access  Private/Admin

export const getUserById =  asyncHandler( async (req, res)=>{
    const user = await User.findById(req.params.id).select('-password')
    if(user){
        res.json(user)
    }else{
        res.status(404)
        throw new Error("User does not exist! ")
    }
})

// @desc    update user 
// @route   PUT api/users/:id
// @access  Private/admin

export const updateUser =  asyncHandler( async (req, res)=>{
   
    const user = await User.findById(req.params.id)
    console.log("User ID", req.params.id)
    if(user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin
        
        const updateUser = await user.save()
        res.json({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin,
        })
    }else{
        res.status(404)
        throw new Error('User not found!')
    }
})

