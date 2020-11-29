import express from 'express';
const router = express.Router();

import { getAddresses, createAddress } from '../controller/addresses.js';

router.route('/:id').get(getAddresses).post(createAddress);

// Export the router
export { router as addressesRoute };
