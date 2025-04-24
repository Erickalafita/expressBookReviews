const express = require('express');
const { deleteReview } = require('../controllers/reviewController');
const { protect, isRegistered } = require('../middleware/auth');

const router = express.Router();

// Delete a review
router.delete('/:id', protect, isRegistered, deleteReview);

module.exports = router; 