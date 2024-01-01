const express = require('express');
const router = express.Router();
const productsM = require("../models/products-m");

router.get('/:bookID', async (req, res) => {
    let bookID = req.params.bookID;
    let Book = await productsM.getBook(bookID);
    //Feedback, image, fix some html css
    //Format Price
    Book.PriceOut = new Intl.NumberFormat().format(Book.PriceOut);
    res.render('customers/Item.hbs', {
        title: bookID,
        login: true, Book,
        mainJs: () => "empty",
        navbar: () => "navbar",
        header: () => "header_search",
    });
})

module.exports = router;