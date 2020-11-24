import express from 'express';
const router = express.Router();

import {
    getOrders,
    getOrder,
} from '../controller/orders.js';

router.route('/').get(getOrders);

router.route('/:id').get(getOrder);

// Export the router
export { router as ordersRoute };
