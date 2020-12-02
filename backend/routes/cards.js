import express from 'express';
const router = express.Router();

import { getCard, createCard, updateCard } from '../controller/cards.js';

router.route('/:id').get(getCard).post(createCard).put(updateCard);

// Export the router
export { router as cardsRoute };
