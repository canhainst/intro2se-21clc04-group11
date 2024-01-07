const express = require('express');
const router = express.Router();
const ordersM = require("../models/orders-m");


router.get('/', async (req, res) => {
    //Buyer ID ID ID ID ID ID ?????????????????????????????????????????????????????????????????????????????????
    let BuyerID = '3';
    //SDFASFASKJFSDAKAS
    // FileSystemWritableFileStream;SAJFSAFSALFDF
    // FJSAFSAFSAFASFAS
    // FASJFLKAS

    //Get Every Order
    let orders = await ordersM.getOrders(BuyerID);
    for(let i = 0; i < orders.length; i++) {
        orders[i].proList = await ordersM.getProductList(orders[i].OrderID);
    }
    res.render('customers/MyPurchase.hbs', {
        title: "My Purchase",
        login: true, orders,
        mainJs: () => "_js/mainT",
        navbar: () => "empty",
        header: () => "header_text",
    });
})

module.exports = router;