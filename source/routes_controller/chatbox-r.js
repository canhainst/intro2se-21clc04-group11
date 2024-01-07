const express = require('express');
const router = express.Router();
const OrderController = require('./OrderController');

router.get('/', async (req, res) => {
    console.log('Route /management is called');
    res.render('admin/chatbox', {
        title: 'Chatbox Admin',
        mainCss: () => '_css/styleChatBox',
        mainJs: () => 'empty',
        footer: () => 'empty'
    });
});



module.exports = router;
