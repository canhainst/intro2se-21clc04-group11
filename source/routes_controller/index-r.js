const express = require("express");
const router = express.Router();
const productsM = require("../models/products-m");
const checkoutM = require("../models/checkout-m");

//get HomePage
router.get("/", async (req, res, next) => {
    let prds = await productsM.getActiveBooks(4);
    for (let i = 0; i < prds.length; i++) {
      prds[i].Descrip = prds[i].Descrip.split('\n')[0];
      prds[i].Rating = await productsM.getStars(prds[i].ProductID);
    }
  
    let featuredPrd = await productsM.getFeaturedBook();
    featuredPrd.Descrip = featuredPrd.Descrip.split('\n')[0];
    featuredPrd.Rating = await productsM.getStars(featuredPrd.ProductID);
  
    let newPrds = await productsM.getNewReleaseBooks(16);
    for (let i = 0; i < newPrds.length; i++) {
      newPrds[i].Rating = await productsM.getStars(newPrds[i].ProductID);
    }
  
    let commingSoonPrds = await productsM.getDeactiveBooks(4);
    for (let i = 0; i < commingSoonPrds.length; i++) {
      commingSoonPrds[i].Rating = await productsM.getStars(commingSoonPrds[i].ProductID);
      commingSoonPrds[i].Descrip = commingSoonPrds[i].Descrip.split('\n')[0];
    }
  
    res.render("customers/HomePage", {
      title: "Home Page",
      login: true,
      prds, newPrds, featuredPrd, commingSoonPrds,
      mainJs: () => "empty",
      navbar: () => "navbar",
      header: () => "header_search",
    });
});

router.get('/checkout', async (req, res, next) => {
  let OrderID = await checkoutM.getID() + 1;
  let today = new Date();
  let day = today.getDate();
  let month = today.getMonth() + 1; // Tháng bắt đầu từ 0, nên cộng thêm 1
  let year = today.getFullYear();

  checkoutM.CreateNewOrder(51);

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

module.exports = router;