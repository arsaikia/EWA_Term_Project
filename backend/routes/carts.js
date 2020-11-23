import express from 'express';
const router = express.Router();

import { createCart, getCarts, deleteCarts } from '../controller/carts.js';

router.route('/:id').get(getCarts);

router.route('/').post(createCart);

router.route('/:id').delete(deleteCarts);

export { router as cartsRoute };
