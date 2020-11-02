import express from 'express';
const router = express.Router();

import { getUsers, getUser } from '../controller/users.js';

router.route('/').get(getUsers);

router.route('/:id').get(getUser);

// Export the rputer
export { router as usersRoute };
