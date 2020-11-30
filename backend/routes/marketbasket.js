import express from 'express';
const router = express.Router();

import {
    getProduct,
    createTable,
    deleteTable,
} from '../controller/marketbasket.js';

router.route('/').post(getProduct);

router.route('/i').post(createTable);

router.route('/d').post(deleteTable);

// Export the router
export { router as marketbasketRoute };
