import express from 'express';
const router = express.Router();

import { getProduct, createTable, deleteTable } from '../controller/marketbasket.js';

router.route('/:id').get(getProduct);

router.route('/').post(createTable);

router.route('/d').delete(deleteTable);

export { router as marketbasketsRoute };