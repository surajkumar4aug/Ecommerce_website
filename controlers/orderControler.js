import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
import Order from '../models/orderModels.js';

// @desc    Create a new Order
// @route   POST /api/orders
// @access   Private

export const addOrderItems =  asyncHandler( async (req, res)=>{

    const {
        orderItems, 
        shippingAddress, 
        paymentMethod, 
        itemsPrice, 
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body

    if(orderItems && orderItems.length === 0){
        res.status(400)
        throw new Error('No order items')
        return
    }else{

        const newOrder = new Order({
           orderItems, 
           shippingAddress, 
           user: req.user._id,
           paymentMethod, 
           itemsPrice, 
           taxPrice,
           shippingPrice,
           totalPrice
        })
        const createdOrder = await newOrder.save()
        res.status(201).json(createdOrder)

    }

})

// @desc    get order by Id
// @route   get /api/orders/:id
// @access   Private

export const getOrderById =  asyncHandler( async (req, res)=>{

    const id = req.params.id
    const order = await Order.findById(id).populate('user', 'name email')
    if(order){
        res.json(order)
    }else{
        res.status(404)
        throw new Error('Order not found!')
    }
})



// @desc    update order to paid
// @route   get /api/orders/:id/pay
// @access   Private

export const updateOrderToPaid =  asyncHandler( async (req, res)=>{

    const id = req.params.id
    const order = await Order.findById(id)

    if(order){
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        }
        const updateOrder = await order.save()
        res.json(updateOrder)
    }else{
        res.status(404)
        throw new Error('Order not found!')
    }
})


// @desc   get Logged in user Orders
// @route   get /api/orders/myorders
// @access   Private

export const getMyOrders  = asyncHandler(async(req, res)=>{

    const orders = await Order.find({user: req.user._id})
    res.json(orders)

})


// @desc    get all orders
// @route   get /api/orders
// @access   Private/Admin

export const getAllOrders =  asyncHandler( async (req, res)=>{
    
    const order = await Order.find({}).populate('user', 'id name')
    res.json(order)
    
})



// @desc    update order to delivered
// @route   get /api/orders/:id/delivered
// @access   Private/admin

// @desc    Update order to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private/Admin
export const updateOrderToDelivered = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
  
    if (order) {
      order.isDelivered = true
      order.deliveredAt = Date.now()
  
      const updatedOrder = await order.save()
  
      res.json(updatedOrder)
    } else {
      res.status(404)
      throw new Error('Order not found')
    }
  })