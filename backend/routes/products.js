import express from 'express';
const router = express.Router();

import { getProducts } from '../controller/products.js';

router.route('/').get(getProducts);

// Export the router
export { router as productsRoute };
