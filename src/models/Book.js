const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  isbn: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  price: {
    type: Number,
    required: true
  },
  coverImage: {
    type: String
  },
  publishedDate: {
    type: Date
  }
}, {
  timestamps: true
});

// Create indexes for search functionality
bookSchema.index({ title: 'text', author: 'text', isbn: 'text' });

const Book = mongoose.model('Book', bookSchema);

module.exports = Book; 