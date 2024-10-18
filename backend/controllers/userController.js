import asyncHandler from '../middleware/asyncHandler.js';
import Users from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// @disc  Auth user and get token
// @route POST /users/login
// @access Public
const authUser = asyncHandler(async (req,res) => {
    const { email,password } = req.body;

    const user = await Users.findOne({email});

    if (user && (await user.matchPassword(password))) {
        
        generateToken(res,user._id);

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
      })  
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
})

// @disc  Register user
// @route POST /users
// @access Public
const registerUser = asyncHandler(async (req,res) => {
    const { name,email,password} = req.body;
    const userExists = await Users.findOne({email});
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }
    const user = await Users.create({
        name,
        email,
        password
    })
    if (user) {
        generateToken(res,user._id);
        res.status(201).json({
            _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
        })
    } else {
        res.status(400);
        throw new Error('Invalid user data'); 
    }
})

// @disc  Logout user / clear cookie
// @route POST /users/logout
// @access Private
const logoutUser = asyncHandler(async (req,res) => {
    res.cookie('jwt','',{
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({message: 'Logged out successfully'});
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





