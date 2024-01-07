const express = require("express");
const router = express.Router();
const checkoutM = require("../models/checkout-m");

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