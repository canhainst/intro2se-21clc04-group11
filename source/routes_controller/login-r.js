const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
    res.render('customers/Login', {
        title: 'Log in',
        mainCss: () => 'empty'
    })
});

module.exports = router;