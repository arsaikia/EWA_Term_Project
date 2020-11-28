import express from 'express';
const router = express.Router();

import { createReview, getReviews, getReviewsByUser} from '../controller/reviews.js';

router.route('/').post(createReview);

router.route('/:id').get(getReviews);

router.route('/byuser/:id').get(getReviewsByUser);

// Export the router
export { router as reviewRouter };
