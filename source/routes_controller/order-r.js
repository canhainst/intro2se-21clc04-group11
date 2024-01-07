const express = require('express');
const router = express.Router();
const OrderController = require('./OrderController');

// Đường dẫn cho trang quản lý đơn hàng
router.get('/', async (req, res) => {
    console.log('Route /management is called');
    res.render('admin/OrderManagement', {
        layout: 'admin',
        mainJs: () => '_js/mainT',
        title: 'Order Management',
    });
});




router.get('/detail/:OrderID', async (req, res) => {
    console.log('Route /detail is called');
    res.render('admin/OrderDetail', {
        layout: 'admin',
        mainJs: () => '_js/mainT',
        title: 'Order Detail',
    });
});



router.use('/', OrderController);

module.exports = router;
