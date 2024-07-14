const jwt = require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../model/usermodel');
const registerUser = asyncHandler(async (req, res) => {
    const {name,email,password}=req.body;
    if(!name || !email || !password){
        res.status(400);
        throw new Error('Please fill all the fields');
    }
    res.status(201).json({message: 'User registered'});
});

const loginUser = asyncHandler(async (req, res) => {
    res.status(200).json({message: 'User logged in'});
});

const getMe = asyncHandler(async (req, res) => {
    res.status(200).json({message: 'Get me'});
});
module.exports = { registerUser, loginUser, getMe };
