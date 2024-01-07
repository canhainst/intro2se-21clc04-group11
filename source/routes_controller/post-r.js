const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('admin/PostProduct.hbs', {
        layout: 'admin',
        title: "Post Product",
        login: true,
        mainJs: () => "empty"
    })
})

module.exports = router;