import express from 'express';
const router = express.Router();

import {
    getTransactions,
    getTransaction,
} from '../controller/transactions.js';

router.route('/').get(getTransactions);

router.route('/:id').get(getTransaction);

// Export the router
export { router as transactionsRoute };
