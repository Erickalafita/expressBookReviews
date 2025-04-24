const Book = require('../models/Book');

// @desc    Get all books
// @route   GET /api/books
// @access  Public
const getBooks = async (req, res) => {
  try {
    const books = await Book.find({});
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get a book by ISBN
// @route   GET /api/books/isbn/:isbn
// @access  Public
const getBookByISBN = async (req, res) => {
  try {
    const book = await Book.findOne({ isbn: req.params.isbn });
    
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get books by author
// @route   GET /api/books/author/:author
// @access  Public
const getBooksByAuthor = async (req, res) => {
  try {
    const books = await Book.find({ 
      author: { $regex: req.params.author, $options: 'i' }
    });
    
    if (books.length > 0) {
      res.json(books);
    } else {
      res.status(404).json({ message: 'No books found for this author' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get books by title
// @route   GET /api/books/title/:title
// @access  Public
const getBooksByTitle = async (req, res) => {
  try {
    const books = await Book.find({ 
      title: { $regex: req.params.title, $options: 'i' } 
    });
    
    if (books.length > 0) {
      res.json(books);
    } else {
      res.status(404).json({ message: 'No books found with this title' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create a book
// @route   POST /api/books
// @access  Private/Admin
const createBook = async (req, res) => {
  try {
    const book = new Book(req.body);
    const createdBook = await book.save();
    res.status(201).json(createdBook);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getBooks,
  getBookByISBN,
  getBooksByAuthor,
  getBooksByTitle,
  createBook
}; 