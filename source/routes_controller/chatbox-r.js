const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
    console.log('Route /management is called');
    res.render('admin/chatbox', {
        title: 'Chatbox Admin',
        layout: 'admin',
        mainJs: () => '_js/mainT',
    });
});



module.exports = router;