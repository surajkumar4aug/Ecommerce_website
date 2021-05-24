import express from 'express';
import {
    addOrderItems, 
    getOrderById, 
    updateOrderToPaid,  
    getMyOrders,
    getAllOrders,
    updateOrderToDelivered
} from "../controlers/orderControler.js"
import {protect, admin} from "../middlwware/authMiddleware.js"

const router = express.Router();

router.get('/my-orders', protect, getMyOrders)
router.route('/').post(protect, addOrderItems).get(protect, admin, getAllOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)

export default router;

