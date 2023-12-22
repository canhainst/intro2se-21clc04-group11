const express = require("express");
const router = express.Router();
const productsM = require("../models/products-m");

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

module.exports = router;