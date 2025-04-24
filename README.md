# Book Shop API Project

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

## Technologies Used
- Node.js
- Express.js
- MongoDB/Mongoose
- JWT for authentication
- Axios for API consumption

## Installation

1. Clone the repository
```
git clone <repository-url>
cd book-final-project
```

2. Install dependencies
```
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/bookshop
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d
```

4. Make sure MongoDB is running on your local machine or update the connection string in `.env` to point to your MongoDB instance.

## Running the Application

1. Start the server
```
npm run dev
```

2. Seed the database with sample data
```
GET http://localhost:3000/api/seed
```

3. Test the Node.js client (in a separate terminal window)
```
node src/bookClientTest.js
```

## API Endpoints

### User Routes
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login a user
- `GET /api/users/profile` - Get user profile (protected)

### Book Routes
- `GET /api/books` - Get all books
- `GET /api/books/isbn/:isbn` - Get book by ISBN
- `GET /api/books/author/:author` - Get books by author
- `GET /api/books/title/:title` - Get books by title
- `GET /api/books/:id/reviews` - Get reviews for a book
- `POST /api/books/:id/reviews` - Add a review for a book (protected)
- `POST /api/books` - Create a new book (protected)

### Review Routes
- `DELETE /api/reviews/:id` - Delete a review (protected)

## Testing

You can use Postman or any API client to test the endpoints. Sample credentials:

- Regular User:
  - Email: user@example.com
  - Password: password123

- Admin User:
  - Email: admin@example.com
  - Password: password123

## License

ISC 