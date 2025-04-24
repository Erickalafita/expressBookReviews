const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load env vars
dotenv.config();

// Comment out database connection
// const connectDB = require('./config/db');
// connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));

// In-memory data
const inMemoryBooks = [
  {
    _id: '1',
    title: 'The Great Adventure',
    author: 'Jane Doe',
    isbn: '9781234567897',
    description: 'An epic adventure across magical lands',
    price: 19.99,
    coverImage: 'https://example.com/great-adventure.jpg',
    publishedDate: '2020-01-15'
  },
  {
    _id: '2',
    title: 'Mystery at Midnight',
    author: 'John Smith',
    isbn: '9789876543210',
    description: 'A thrilling mystery novel set in London',
    price: 15.99,
    coverImage: 'https://example.com/mystery-midnight.jpg',
    publishedDate: '2021-03-20'
  },
  {
    _id: '3',
    title: 'Coding Mastery',
    author: 'Alan Turing',
    isbn: '9780123456789',
    description: 'Learn to code like a professional',
    price: 29.99,
    coverImage: 'https://example.com/coding-mastery.jpg',
    publishedDate: '2019-11-10'
  },
  {
    _id: '4',
    title: 'The History of Everything',
    author: 'Jane Doe',
    isbn: '9785432109876',
    description: 'A comprehensive history of the universe',
    price: 24.99,
    coverImage: 'https://example.com/history-everything.jpg',
    publishedDate: '2018-07-05'
  }
];

// Simple routes for demo
app.get('/api/books', (req, res) => {
  res.json(inMemoryBooks);
});

app.get('/api/books/isbn/:isbn', (req, res) => {
  const book = inMemoryBooks.find(b => b.isbn === req.params.isbn);
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

app.get('/api/books/author/:author', (req, res) => {
  const books = inMemoryBooks.filter(b => 
    b.author.toLowerCase().includes(req.params.author.toLowerCase())
  );
  if (books.length > 0) {
    res.json(books);
  } else {
    res.status(404).json({ message: 'No books found for this author' });
  }
});

app.get('/api/books/title/:title', (req, res) => {
  const books = inMemoryBooks.filter(b => 
    b.title.toLowerCase().includes(req.params.title.toLowerCase())
  );
  if (books.length > 0) {
    res.json(books);
  } else {
    res.status(404).json({ message: 'No books found with this title' });
  }
});

// Home route - Serve the frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// API home route
app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to the Book Shop API (Demo Mode)',
    endpoints: {
      books: '/api/books',
      bookByISBN: '/api/books/isbn/:isbn',
      booksByAuthor: '/api/books/author/:author',
      booksByTitle: '/api/books/title/:title'
    }
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} (Demo Mode - No Database)`);
}); 