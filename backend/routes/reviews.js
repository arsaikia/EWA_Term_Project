import express from 'express';
const router = express.Router();

import { createReview, getReviews } from '../controller/reviews.js';

router.route('/').post(createReview);

router.route('/:id').get(getReviews);

// Export the router
export { router as reviewRouter };
