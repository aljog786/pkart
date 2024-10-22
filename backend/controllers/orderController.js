import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/orderModel.js';

// @disc  create new order
// @route POST /orders
// @access Private
const addOrderItems = asyncHandler(async (req,res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body;
    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('No order items');
    } else {
        const order = new Order({
            orderItems: orderItems.map((x) => ({
                ...x,
                product: x._id,
                _id: undefined,
            })),
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        })
        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    }
})

// @disc  get logged in user orders
// @route GET /orders/myorders
// @access Private
const getMyOrders = asyncHandler(async (req,res) => {
    const orders = await Order.find({user: req.user._id})
    res.status(200).json(orders);
})

// @disc  get order by ID
// @route GET /orders/:id
// @access Private
const getOrderById = asyncHandler(async (req,res) => {
    const order = await Order.findById(req.params.id).populate('Users','name email');
    if (order) {
       res.status(200).json(order); 
    } else {
        res.status(404);
        throw new Error("Order not found");
    }
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