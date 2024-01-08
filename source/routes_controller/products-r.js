const express = require("express");
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

    res.render('customers/Item.hbs', {
        title: Book.ProductName,
        login: true, Book, Ratings, Feedbacks,
        mainJs: () => "empty",
        navbar: () => "navbar",
        header: () => "header_search",
    });
})
router.get("/search", async (req, res, next) => {
  try {
    // console.log(req.query);
    const cate = req.query.cate || "";
    const page = req.query.page || 1;
    const perPage = 12;
    const book = req.query.inputBook || "";
    const filter = req.query.filter || "All";
    let prds;
    if (cate != ""){
      prds = await productsM.getBookByCate(cate, filter);
    }
    else{
      prds = await productsM.getBookByName(req.query.inputBook, filter, cate);
    }
    
    let totalPages = Math.ceil(prds.length / perPage);
    for (let i = 0; i < prds.length; i++) {
      prds[i].Rating = await productsM.getStars(prds[i].ProductID);
    }
    // console.log(prds);
    res.render("customers/SearchPage", {
      title: book == "" && filter == "All" ? "Books" : "Search",
      login: true,
      book,
      filter,
      page,
      cate,
      totalPages,
      prds: prds.slice((page - 1) * perPage, page * perPage),
      mainJs: () => "empty",
      navbar: () => "navbar",
      header: () => "header_search",
    });
  } catch (err) {
    next(err);
  }
});

router.get("/new_release", async (req, res, next) => {
  try {
    let prds = await productsM.getNewReleaseBooks(12);
    for (let i = 0; i < prds.length; i++) {
      prds[i].Rating = await productsM.getStars(prds[i].ProductID);
    }
    // console.log(prds);
    res.render("customers/SearchPage", {
      title: "New Release",
      login: true,
      prds,
      mainJs: () => "empty",
      navbar: () => "navbar",
      header: () => "header_search",
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
