import express from 'express';
const router = express.Router();

import { getUsers, getUser, createUser } from '../controller/users.js';

router.route('/').get(getUsers).post(createUser);

router.route('/:id').get(getUser);

// Export the rputer
export { router as usersRoute };
