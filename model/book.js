const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    bookId: { type: String, unique: true, required: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    publishedYear: { type: Number, required: true },
    language: { type: String, required: true }
});

const Book = mongoose.model('BookDetails', bookSchema);

module.exports = Book;
