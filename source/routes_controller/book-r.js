const express = require('express');
const router = express.Router();
const productsM = require("../models/products-m");
const feedbacksM = require("../models/feedbacks-m");
router.get('/:bookID', async (req, res) => {
    let bookID = req.params.bookID;
    let Book = await productsM.getBook(bookID);
    Book.Rating = await productsM.getStars(bookID)
    Book.Rating = Book.Rating.toPrecision(2);
    let Ratings = await feedbacksM.getCountStars(bookID);
    Book.Total = Ratings[0].TotalNum;
    //Feedback
    let Feedbacks = await feedbacksM.getFeedbacks(bookID);

    //Format Price
    Book.PriceOut = new Intl.NumberFormat().format(Book.PriceOut);
    res.render('customers/Item.hbs', {
        title: bookID,
        login: true, Book, Ratings, Feedbacks,
        mainJs: () => "empty",
        navbar: () => "navbar",
        header: () => "header_search",
    });
})

module.exports = router;