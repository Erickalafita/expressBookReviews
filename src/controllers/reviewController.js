const Review = require('../models/Review');
const Book = require('../models/Book');

// @desc    Get reviews for a book
// @route   GET /api/books/:id/reviews
// @access  Public
const getBookReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ book: req.params.id })
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    
    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create a review
// @route   POST /api/books/:id/reviews
// @access  Private
const createBookReview = async (req, res) => {
  const { rating, comment } = req.body;
  const bookId = req.params.id;

  try {
    // Check if book exists
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Check if user already reviewed this book
    const alreadyReviewed = await Review.findOne({
      user: req.user._id,
      book: bookId
    });

    if (alreadyReviewed) {
      // Update existing review
      alreadyReviewed.rating = rating;
      alreadyReviewed.comment = comment;
      const updatedReview = await alreadyReviewed.save();
      return res.status(200).json(updatedReview);
    } else {
      // Create new review
      const review = new Review({
        rating,
        comment,
        user: req.user._id,
        book: bookId
      });

      const createdReview = await review.save();
      res.status(201).json(createdReview);
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a review
// @route   DELETE /api/reviews/:id
// @access  Private
const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Check if user owns the review
    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You can only delete your own reviews' });
    }

    await review.deleteOne();
    res.json({ message: 'Review removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getBookReviews,
  createBookReview,
  deleteReview
}; 