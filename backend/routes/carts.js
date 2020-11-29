import express from 'express';
const router = express.Router();

import {
    createCart,
    getCarts,
    deleteCarts,
    decrementCartQuantity,
} from '../controller/carts.js';

router.route('/:id').get(getCarts);

router.route('/').post(createCart);

router.route('/:id').delete(deleteCarts);

router.route('/update').post(decrementCartQuantity);

export { router as cartsRoute };
