import express from 'express';
const router = express.Router();

import {
    getCard,
} from '../controller/cards.js';

router.route('/:id').get(getCard);

// Export the router
export { router as cardsRoute };
