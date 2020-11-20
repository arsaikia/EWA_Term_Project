import express from 'express';
const router = express.Router();


import { getProducts, getProduct } from '../controller/stores.js';

router.route('/').get(getStores);

// router.route('/:id').get(getProduct);

// Export the rputer
export { router as usersRoute };


