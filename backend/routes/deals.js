import express from 'express';
const router = express.Router();

import { getTweets } from '../controller/deals.js';

router.route('/tweet').get(getTweets);

// Export the router
export { router as dealsRoute };


