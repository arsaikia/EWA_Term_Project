import express from 'express';
const router = express.Router();

import {
    getTransactions,
    getTransaction,
    createTransaction,
} from '../controller/transactions.js';

router.route('/').get(getTransactions).post(createTransaction);

router.route('/:id').get(getTransaction);

// Export the router
export { router as transactionsRoute };
