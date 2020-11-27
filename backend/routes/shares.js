import express from 'express';
const router = express.Router();

import { getShares, getSharePerUser, createShare } from '../controller/shares.js';

router.route('/').get(getShares)

router.route('/:id').get(getSharePerUser) 

router.route('/:id1:id2').post(createShare)

// Export the router
export { router as sharesRoute };
