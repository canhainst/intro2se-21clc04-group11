const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('customers/Checkout',{
        title: 'Home Page',
        mainJs: () => 'empty',
        navbar:()=>'navbar',
        header: () => 'header_search',
    })
});

module.exports = router;
