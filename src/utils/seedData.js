const Book = require('../models/Book');
const User = require('../models/User');
const Review = require('../models/Review');

const seedData = async () => {
  try {
    // Clear existing data
    await Book.deleteMany({});
    await User.deleteMany({});
    await Review.deleteMany({});

    // Create sample users
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'password123',
      role: 'admin'
    });

    const regularUser = await User.create({
      name: 'Regular User',
      email: 'user@example.com',
      password: 'password123'
    });

    // Create sample books
    const books = await Book.insertMany([
      {
        title: 'The Great Adventure',
        author: 'Jane Doe',
        isbn: '9781234567897',
        description: 'An epic adventure across magical lands',
        price: 19.99,
        coverImage: 'https://example.com/great-adventure.jpg',
        publishedDate: new Date('2020-01-15')
      },
      {
        title: 'Mystery at Midnight',
        author: 'John Smith',
        isbn: '9789876543210',
        description: 'A thrilling mystery novel set in London',
        price: 15.99,
        coverImage: 'https://example.com/mystery-midnight.jpg',
        publishedDate: new Date('2021-03-20')
      },
      {
        title: 'Coding Mastery',
        author: 'Alan Turing',
        isbn: '9780123456789',
        description: 'Learn to code like a professional',
        price: 29.99,
        coverImage: 'https://example.com/coding-mastery.jpg',
        publishedDate: new Date('2019-11-10')
      },
      {
        title: 'The History of Everything',
        author: 'Jane Doe',
        isbn: '9785432109876',
        description: 'A comprehensive history of the universe',
        price: 24.99,
        coverImage: 'https://example.com/history-everything.jpg',
        publishedDate: new Date('2018-07-05')
      }
    ]);

    // Create sample reviews
    await Review.insertMany([
      {
        book: books[0]._id,
        user: regularUser._id,
        rating: 4,
        comment: 'Loved this book! Great storytelling and characters.'
      },
      {
        book: books[1]._id,
        user: adminUser._id,
        rating: 5,
        comment: 'Absolutely thrilling from start to finish!'
      },
      {
        book: books[0]._id,
        user: adminUser._id,
        rating: 3,
        comment: 'Decent read but a bit predictable.'
      }
    ]);

    console.log('Seed data inserted successfully');
  } catch (error) {
    console.error('Error seeding data:', error.message);
    throw error;
  }
};

module.exports = seedData; 