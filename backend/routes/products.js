import express from 'express';
const router = express.Router();

import {
    getProducts,
    getProduct,
    getFilteredProducts,
    getAllMatchingProducts,
    getProductsPerStore,
    getProductsNotInStore
} from '../controller/products.js';

router.route('/store/:id').get(getProducts);

router.route('/instore/:id').get(getProductsPerStore);

router.route('/nonstore/:id').get(getProductsNotInStore);

router.route('/').post(getAllMatchingProducts);

router.route('/:id').get(getProduct);

router.route('/matches/:id').get(getFilteredProducts);

// Export the router
export { router as productsRoute };
