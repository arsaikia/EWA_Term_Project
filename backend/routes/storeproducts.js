import express from 'express';
const router = express.Router();

import { createStoreProduct, deleteStoreProduct } from '../controller/storeproducts.js';

router.route('/create/').post(createStoreProduct)

router.route('/delete/').post(deleteStoreProduct)

// Export the router
export { router as storeproductsRoute };
