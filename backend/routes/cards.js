import express from 'express';
const router = express.Router();

import { getCard, createCard } from '../controller/cards.js';

router.route('/:id').get(getCard).post(createCard);

// Export the router
export { router as cardsRoute };
