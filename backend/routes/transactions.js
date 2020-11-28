import express from 'express';
const router = express.Router();

import {
    getTransactions,
    getTransaction,
    createTransaction,
    updateTransactionStatus,
} from '../controller/transactions.js';

router.route('/').get(getTransactions).post(createTransaction);

router.route('/:id').get(getTransaction).post(updateTransactionStatus);

// Export the router
export { router as transactionsRoute };
