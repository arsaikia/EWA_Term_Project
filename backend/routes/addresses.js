import express from 'express';
const router = express.Router();

import { getAddresses, getAddressWithId } from '../controller/addresses.js';

router.route('/:id').get(getAddresses);

router.route('/address/:id').get(getAddressWithId);

// Export the router
export { router as addressesRoute };
