const {
  getAllBooks,
  getBookByISBN,
  getBooksByAuthor,
  getBooksByTitle
} = require('./utils/bookClient');

// Test function to demonstrate each method
const runTests = async () => {
  console.log('======= Book Shop API Client Tests =======');
  
  try {
    // Task 10: Get all books
    console.log('\n--- Task 10: Get All Books ---');
    const allBooks = await getAllBooks();
    console.log('All books:', allBooks);

    // Task 11: Search by ISBN using Promises
    console.log('\n--- Task 11: Get Book by ISBN ---');
    const isbn = '9781234567897';  // Replace with a valid ISBN
    getBookByISBN(isbn)
      .then(book => console.log('Book found by ISBN:', book))
      .catch(error => console.error('ISBN search failed:', error.message));

    // Task 12: Search by Author
    console.log('\n--- Task 12: Get Books by Author ---');
    const author = 'Jane Doe';  // Replace with a valid author name
    const authorBooks = await getBooksByAuthor(author);
    console.log('Books by author:', authorBooks);

    // Task 13: Search by Title
    console.log('\n--- Task 13: Get Books by Title ---');
    const title = 'Great Book';  // Replace with a valid title
    const titleBooks = await getBooksByTitle(title);
    console.log('Books by title:', titleBooks);
    
  } catch (error) {
    console.error('Test failed:', error.message);
  }
};

// Run the tests
runTests(); 