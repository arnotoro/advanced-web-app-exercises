var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

// mongoDB models
const Books = require('../models/Books');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/book', (req, res, next) => {
  const newBook = new Books({
    name: req.body.name,
    author: req.body.author,
    pages: req.body.pages,
  });

  newBook.save((err, book) => {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      res.json(book);
    }
  });
})

router.get('/book/:name', (req, res, next) => {
  const { name } = req.params;
  Books.findOne({ name: name }, (err, book) => {
    if (err) {
      console.log(err);
      return next(err);
    } else if (book) {
      res.json(book);
    } else {
      res.redirect('/notfound')
  }})
})




module.exports = router;
