const express = require('express');
const router = express.Router();
const OrderModel = require('../models/OrderModel');

router.get('/all', async (req, res, next) => {
  try {
    const orders = await OrderModel.getAllOrders();
    res.json(orders);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/:OrderID', async (req, res, next) => {
    try {
        const OrderID = req.params.OrderID;
      const orders = await OrderModel.getOrderByID(OrderID);
      res.json(orders);
    } catch (error) {
      console.error(error);
      next(error);
    }
  });

  router.put('/complete', async (req, res) => {
    try {
        const orderId = req.body.orderId;
        console.log('orderId:', orderId);
        const newStatus = 'Completed';
  
        const rowsAffected = await OrderModel.updateOrderStatus(orderId, newStatus);
  
        if (rowsAffected > 0) {
            res.status(200).json({ success: true, message: 'Order marked as completed successfully.' });
        } else {
            res.status(404).json({ success: false, message: 'Order not found or could not be marked as completed.' });
        }
    } catch (error) {
        console.error('Error in /complete:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
});



module.exports = router;
