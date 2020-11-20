import express from 'express';
const router = express.Router();

import { getProducts, getProduct } from '../controller/products.js';

router.route('/').get(getProducts);

router.route('/:id').get(getProduct);

// Export the rputer
export { router as usersRoute };

// 