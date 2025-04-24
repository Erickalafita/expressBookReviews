const express = require('express');
const { 
  getBooks, 
  getBookByISBN, 
  getBooksByAuthor, 
  getBooksByTitle,
  createBook
} = require('../controllers/bookController');
const { getBookReviews, createBookReview } = require('../controllers/reviewController');
const { protect, isRegistered } = require('../middleware/auth');

const router = express.Router();

// Get all books
router.get('/', getBooks);

// Get book by ISBN
router.get('/isbn/:isbn', getBookByISBN);

// Get books by author
router.get('/author/:author', getBooksByAuthor);

// Get books by title
router.get('/title/:title', getBooksByTitle);

// Get book reviews
router.get('/:id/reviews', getBookReviews);

// Create/update book review - protected route
router.post('/:id/reviews', protect, isRegistered, createBookReview);

// Admin route to create a new book
router.post('/', protect, createBook);

module.exports = router; 