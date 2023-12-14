const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('customers/HomePage',{
        title: 'Home Page',
        mainCss: () => '_css/styleC',
    })
});

module.exports = router;