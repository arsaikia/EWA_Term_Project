import express from 'express';
const router = express.Router();

import { getProducts, getProduct } from '../controller/products.js';

router.route('/').get(getProducts);

router.route('/:id').get(getProduct);

// Export the router
export { router as productsRoute };
