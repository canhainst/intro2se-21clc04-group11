import express from 'express';
import orderService from '../services/orderDetail-service.js';

const router = express.Router();

router.get('/Orders/:OrderID', async (req, res) => {

    const id = req.params.OrderID;

    try {
        const orders = await orderService.OrderByID(id);
        return res.json(orders.recordsets[0]);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' });
    }

});

export default router;

