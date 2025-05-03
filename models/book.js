const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  bookId: Number,
  name: String,
  isAvailable: Boolean,
})

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;