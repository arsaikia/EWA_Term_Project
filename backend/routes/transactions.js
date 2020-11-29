import express from 'express';
const router = express.Router();

import {
    getTransactions,
    getTransaction,
    createTransaction,
    updateOrderStatus,
} from '../controller/transactions.js';

router.route('/').get(getTransactions).post(createTransaction);

router.route('/:id').get(getTransaction)

router.route('/update/:id').post(updateOrderStatus);
// Export the router
export { router as transactionsRoute };
