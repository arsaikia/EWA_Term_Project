import express from 'express';
const router = express.Router();

import {
    createReview,
    getReviews,
    getReviewsByUser,
    getTopReviews,
} from '../controller/reviews.js';

router.route('/').get(getTopReviews).post(createReview);

router.route('/:id').get(getReviews);

router.route('/user/:id').get(getReviewsByUser);

// Export the router
export { router as reviewRouter };
