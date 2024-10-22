import express from 'express';
const router = express.Router();
import {
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getAllOrders
} from '../controllers/orderController.js';
import { protect,admin } from '../middleware/authMiddleware.js';

router.route('/').post(protect,addOrderItems).get(protect,admin,getAllOrders);
router.route('/mine').get(protect,getMyOrders);
router.route('/:id').get(protect,admin,getOrderById);
router.route('/:id/pay').get(protect,updateOrderToPaid);
router.route('/:id/deliver').get(protect,admin,updateOrderToDelivered);







export default router;