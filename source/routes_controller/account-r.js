const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
    res.render('customers/Login', {
        mainCss: () => 'empty'
    })
});

module.exports = router;