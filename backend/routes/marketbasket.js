import express from 'express';
const router = express.Router();

import {
    getProduct,
    createTable,
    deleteTable,
    getProducts
} from '../controller/marketbasket.js';

router.route('/').get(getProducts).post(getProduct);

router.route('/i').post(createTable);

router.route('/d').post(deleteTable);

// Export the router
export { router as marketbasketRoute };
