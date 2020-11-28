import express from 'express';
const router = express.Router();

import { getShares, getSharePerUser, createShare } from '../controller/shares.js';

router.route('/').get(getShares).post(createShare)

router.route('/:id').get(getSharePerUser)

// Export the router
export { router as sharesRoute };
