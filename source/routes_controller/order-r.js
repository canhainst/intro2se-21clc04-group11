const express = require('express');
const router = express.Router();
const OrderController = require('./OrderController');

// Đường dẫn cho trang quản lý đơn hàng
router.get('/', async (req, res) => {
    console.log('Route /management is called');
    res.render('admin/OrderManagement', {
        title: 'Order Management',
        mainCss: () => '_css/styleT',
        mainJs: () => '_js/mainT',
        footer: () => 'empty'
    });
});




router.get('/detail/:OrderID', async (req, res) => {
    console.log('Route /detail is called');
    res.render('admin/OrderDetail', {
        title: 'Order Detail',
        mainCss: () => '_css/styleT',
        mainJs: () => '_js/mainT',
        footer: () => 'empty',
       
    });
});





router.use('/', OrderController);

module.exports = router;
