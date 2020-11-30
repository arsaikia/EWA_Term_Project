import express from 'express';
const router = express.Router();

import {
    getProducts,
    getProduct,
    getFilteredProducts,
    getAllMatchingProducts,
} from '../controller/products.js';

router.route('/store/:id').get(getProducts);

router.route('/').post(getAllMatchingProducts);

router.route('/:id').get(getProduct);

router.route('/matches/:id').get(getFilteredProducts);

// Export the router
export { router as productsRoute };
