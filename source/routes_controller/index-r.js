const express = require("express");
const router = express.Router();
const productsM = require("../models/products-m");

router.get("/", async (req, res) => {
  let prds = await productsM.getActiveBooks(4);
  prds = prds.map((product) => ({
    ...product,
    Descrip: product.Descrip.split('\n')[0],
  }));

  let newPrds = await productsM.getNewReleaseBooks(16);

  res.render("customers/HomePage", {
    title: "Home Page",
    prds, newPrds,
    mainJs: () => "empty",
    navbar: () => "navbar",
    header: () => "header_search",
  });
});

//get About Us page
router.get("/about", async (req, res, next) => {
  try {
    res.render("customers/AboutUs", {
      title: "About Us",
      login: true,
      mainJs: () => "empty",
      navbar: () => "navbar",
      header: () => "header_search",
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
