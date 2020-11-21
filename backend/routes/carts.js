import express from 'express';
const router = express.Router();

import { createCart, getCarts } from '../controller/carts.js';

router.route('/:id').get(getCarts);


router.route('/').post(createCart);


export { router as cartsRoute };
