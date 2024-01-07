const express = require("express");
const router = express.Router();
const checkoutM = require("../models/checkout-m");

router.get('/', async (req, res, next) => {
    let OrderID = await checkoutM.getID() + 1;
    let today = new Date();
    let day = today.getDate();
    let month = today.getMonth() + 1; // Tháng bắt đầu từ 0, nên cộng thêm 1
    let year = today.getFullYear();
  
    checkoutM.CreateNewOrder(5);
  
    res.render('customers/Checkout',{
        day: day,
        month: month,
        year: year,
        OrderID: OrderID,
        title: 'Checkout',
        text: 'Check Out',
        login: true,
        mainJs: () => 'empty',
        navbar:()=>'empty',
        header: () => 'header_text',
    })
});

router.get('/done', async (req, res, next) => {
    res.render('customers/Done' ,{
        title: 'Done',
        text: 'Done',
        login: true,
        mainJs: () => 'empty',
        navbar:()=>'empty',
        header: () => 'header_text',
    })
});

router.post('/purchase', async (req, res, next) => {
    try {
        let {OrderID, BuyerID, BookArray: bookArrayJSON, TotalPayment, formattedDate } = req.body;
            checkoutM.purchase(OrderID, BuyerID, bookArrayJSON, formattedDate, TotalPayment);
        res.send(req.body);
    } catch (err) {
        next(err);
    }
});
module.exports = router;