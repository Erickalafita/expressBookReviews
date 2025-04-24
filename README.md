# Book Shop API

A RESTful API for a book shop that allows users to browse books, register, login, and manage book reviews.

## Features

### General Users
- Get the book list available in the shop
- Get books based on ISBN
- Get all books by Author
- Get all books based on Title
- Get book Review
- Register New user
- Login as a Registered user

### Registered Users
- Add/Modify a book review
- Delete book review added by that particular user

### Node.JS Client Program
- Get all books – Using async callback function
- Search by ISBN – Using Promises
- Search by Author
- Search by Title

## Live Demo

The application has both backend API and a frontend interface:
- API Endpoints: `/api/books`, `/api/books/isbn/:isbn`, etc.
- Frontend Interface: A modern responsive UI for browsing books

## API Endpoints

### Book Routes
- `GET /api/books` - Get all books
- `GET /api/books/isbn/:isbn` - Get book by ISBN
- `GET /api/books/author/:author` - Get books by author
- `GET /api/books/title/:title` - Get books by title
- `GET /api/books/:id/reviews` - Get reviews for a book

### User Routes
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login a user
- `GET /api/users/profile` - Get user profile (protected)

### Review Routes
- `POST /api/books/:id/reviews` - Add a review for a book (protected)
- `DELETE /api/reviews/:id` - Delete a review (protected)

## Technologies Used
- Node.js
- Express.js
- MongoDB/Mongoose
- JWT for authentication
- Axios for API consumption

## Installation

1. Clone the repository
```
git clone https://github.com/Erickalafita/expressBookReviews.git
cd expressBookReviews
```

2. Install dependencies
```
npm install
```

3. Start the server
```
npm run dev
```

4. Access the application at http://localhost:3000

## License

Apache-2.0 license 
