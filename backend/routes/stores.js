import express from 'express';
const router = express.Router();


import { getStores } from '../controller/stores.js';

router.route('/').get(getStores);

// router.route('/:id').get(getProduct);

// Export the router
export { router as storesRoute };


