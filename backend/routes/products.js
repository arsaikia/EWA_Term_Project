import express from 'express';
const router = express.Router();

import {
    getProducts,
    getProduct,
    getFilteredProducts,
} from '../controller/products.js';

router.route('/').get(getProducts);

router.route('/:id').get(getProduct);

router.route('/matches/:id').get(getFilteredProducts);

// Export the router
export { router as productsRoute };
