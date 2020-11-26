import express from 'express';
const router = express.Router();

import { getAddresses } from '../controller/addresses.js';

router.route('/:id').get(getAddresses);

// Export the router
export { router as addressesRoute };
