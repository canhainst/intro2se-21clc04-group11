import express from 'express';
import orderService from '../services/order-service.js';

const router = express.Router();

router.get('/Orders', async (req, res) => {
    
    try {
        const orders = await orderService.AllOrder();
        return res.json(orders.recordsets[0]);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' });
    }

});

export default router;
