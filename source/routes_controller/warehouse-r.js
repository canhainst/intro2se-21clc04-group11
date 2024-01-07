const express = require('express');
const router = express.Router();
const WarehouseController = require('./WarehouseController');
const WarehouseModel = require('../models/WarehouseModel');

router.get('/', async (req, res) => {
    console.log('Route /warehouse is called');
    res.render('admin/Warehouse', {
        title: 'Warehouse',
        mainCss: () => '_css/styleT',
        mainJs: () => '_js/mainT',
        footer: () => 'empty'
    });
});

router.get('/edit', async (req, res) => {
    console.log('Route /editproduct is called');
    res.render('admin/EditProduct', {
        title: 'EditProduct',
        mainCss: () => '_css/styleE',
        mainJs: () => '_js/mainT',
        footer: () => 'empty'
    });
});



/*router.put('/', async (req, res) => {
    console.log('Route /warehouse is called');
    res.render('admin/Warehouse', {
        title: 'Warehouse',
        mainCss: () => '_css/styleT',
        mainJs: () => '_js/mainT',
        footer: () => 'empty'
    });
});*/



router.use('/', WarehouseController);

module.exports = router;