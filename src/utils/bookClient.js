const axios = require('axios');

const API_URL = 'http://localhost:3000/api';

// Task 10: Get all books using async callback function
const getAllBooks = async () => {
  try {
    const response = await axios.get(`${API_URL}/books`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all books:', error.message);
    throw error;
  }
};

// Task 11: Search by ISBN using Promises
const getBookByISBN = (isbn) => {
  return new Promise((resolve, reject) => {
    axios.get(`${API_URL}/books/isbn/${isbn}`)
      .then(response => resolve(response.data))
      .catch(error => {
        console.error('Error fetching book by ISBN:', error.message);
        reject(error);
      });
  });
};

// Task 12: Search by Author
const getBooksByAuthor = async (author) => {
  try {
    const response = await axios.get(`${API_URL}/books/author/${author}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching books by author:', error.message);
    throw error;
  }
};

// Task 13: Search by Title
const getBooksByTitle = async (title) => {
  try {
    const response = await axios.get(`${API_URL}/books/title/${title}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching books by title:', error.message);
    throw error;
  }
};

module.exports = {
  getAllBooks,
  getBookByISBN,
  getBooksByAuthor,
  getBooksByTitle
}; 