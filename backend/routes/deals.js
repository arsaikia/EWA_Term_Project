import express from 'express';
const router = express.Router();

import {
    getTweets,
    getBestDeals,
    getBestReviews,
} from '../controller/deals.js';

router.route('/tweet').get(getTweets);

router.route('/reviews/').get(getBestReviews);

router.route('/best/:id').post(getBestDeals);

// Export the router
export { router as dealsRoute };
