const express = require("express");
const router = express.Router();
const productsM = require("../models/products-m");
const multer = require("multer");
const upload = multer({dest: 'image/books'});

router.get("/addProduct", async (req, res, next) => {
  try {
    res.render("admin/AddProduct", {
        layout: "admin",
        title: "Add Product",
        mainJs: () => "_js/mainT",
    });
  } catch (err) {
    next(err);
  }
});

router.post('/addProduct', upload.single('img'), async (req, res, next) => {
    try{
        const bookName = req.body.bookName;
        const author = req.body.author;
        const category = req.body.category;
        const pubCompany = req.body.pubCompany;
        const pubYear = req.body.pubYear;
        const inPrice = req.body.inPrice;
        const quantity = req.body.quantity;
        const des = req.body.des;
        const Photo = `/image/books/${req.file.filename}`;
        await productsM.addProduct(bookName, author, category, pubCompany, pubYear, inPrice, quantity, des, Photo);
        res.render("admin/AddProduct", {
            layout: "admin",
            title: "Add Product",
            nofi: "Add product to warehouse successfully!",
            mainJs: () => "_js/mainT",
        });
    } catch (err){
        next(err);
    }
});


module.exports = router;
