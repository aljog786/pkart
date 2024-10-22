import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/orderModel.js';

// @disc  create new order
// @route POST /orders
// @access Private
const addOrderItems = asyncHandler(async (req,res) => {
    res.send('add order items');
})

// @disc  get logged in user orders
// @route GET /orders/myorders
// @access Private
const getMyOrders = asyncHandler(async (req,res) => {
    res.send('get my orders');
})

// @disc  get order by ID
// @route GET /orders/:id
// @access Private
const getOrderById = asyncHandler(async (req,res) => {
    res.send('get order by id');
})

// @disc  Update order to paid
// @route GET /orders/:id/pay
// @access Private
const updateOrderToPaid = asyncHandler(async (req,res) => {
    res.send('update order to paid');
})

// @disc  Update order to delivered
// @route GET /orders/:id/deliver
// @access Private/Admin
const updateOrderToDelivered = asyncHandler(async (req,res) => {
    res.send('update order to delivered');
})

// @disc  Get all orders
// @route GET /orders
// @access Private/Admin
const getAllOrders = asyncHandler(async (req,res) => {
    res.send('get all orders');
})


export {
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getAllOrders
};