const express = require('express');
const router = express.Router();
const ordersM = require("../models/orders-m");
const feedbacksM = require("../models/feedbacks-m"); 

router.get('/', async (req, res) => {
    //Buyer ID ID ID ID ID ID ?????????????????????????????????????????????????????????????????????????????????
    let BuyerID = '2';
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

router.post('/', async (req, res) => {
    const { Order, star, Description } = req.body;
    let OrderID = Order;
    let proList = await ordersM.getProductList(OrderID);
    let Rating = star;
    let Feedback = Description;
    // USERID INCOMPLETED DFASKJFSAJFDHASD
    // FDASJFLKASFASFASDF
    let UserID = '3';
    //FDASFASFASF
    // FDASKLFAJSFLASFD ÁLGNA
    for(let i = 0; i < proList.length; i++){
        feedbacksM.addFeedback('1', proList[i].ProductID, UserID, Feedback, Rating);
    }
    res.redirect('/mypurchase');
}
);

module.exports = router;