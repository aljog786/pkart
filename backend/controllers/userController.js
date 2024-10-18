import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';

// @disc  Auth user and get token
// @route POST /users/login
// @access Public
const authUser = asyncHandler(async (req,res) => {
    res.send('auth user');
})

// @disc  Register user
// @route POST /users
// @access Public
const registerUser = asyncHandler(async (req,res) => {
    res.send('register user');
})

// @disc  Logout user / clear cookie
// @route POST /users/logout
// @access Private
const logoutUser = asyncHandler(async (req,res) => {
    res.send('logout user');
})

// @disc  Get user profile
// @route GET /users/profile
// @access Private
const getUserProfile = asyncHandler(async (req,res) => {
    res.send('get user profile');
})

// @disc  Update user profile
// @route PUT /users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req,res) => {
    res.send('update user profile');
})

// @disc  Get users
// @route GET /users
// @access Private/Admin
const getUsers = asyncHandler(async (req,res) => {
    res.send('get users');
})

// @disc  Get user by id
// @route GET /users/:id
// @access Private/Admin
const getUserById = asyncHandler(async (req,res) => {
    res.send('get user by id');
})

// @disc  Delete user
// @route DELETE /users/:id
// @access Private/Admin
const deleteUser = asyncHandler(async (req,res) => {
    res.send('delete user');
})

// @disc  Update user
// @route PUT /users/:id
// @access Private/Admin
const updateUser = asyncHandler(async (req,res) => {
    res.send('update user');
})

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser

}

