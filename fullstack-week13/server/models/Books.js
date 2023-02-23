const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BooksSchema = new Schema({
    name: String,
    author: String,
    pages: Number,
});

module.exports = mongoose.model('Books', BooksSchema);