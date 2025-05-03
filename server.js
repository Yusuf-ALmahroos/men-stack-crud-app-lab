const express        = require('express');
const logger         = require('morgan');
const methodOverride = require('method-override');
const db             = require('./db');

const app = express();

const Book = require('./models/book.js');

const BooksList = [];

app.use(logger('dev'));

app.use(methodOverride("_method"));
app.use(express.urlencoded({extended: false}))

app.listen(3000, () =>   
{
  console.log("Listening to port 3000");
})

app.get('/books', async (req, res) => 
{
  const books = await Book.find();

  if(books.length !== 0)
  {
    books.forEach((book) => 
    {
      if(!BooksList.some((item) => item.bookId === book.bookId))
      {
        BooksList.push(book);
      }
    })
  }
  res.render('books.ejs', {Books: BooksList});
})

app.post('/books/new', async (req, res) => 
{
  console.log("POST: ", req.body);
  let isAvailable = false;
  if(req.body.isAvailable && req.body.isAvailable ===  "on")
  {
    isAvailable = true;
  }
  const book = await Book.create({
    bookId: req.body.bookId,
    bookName: req.body.bookName,
    isAvailable
  });
  
  res.send(book);
})

app.get('/books/new', (req, res) => 
{
  res.render('new.ejs');
})

