import express from 'express';
const router = express.Router();

import { getUsers, getUser, createUser, AuthenticateUser } from '../controller/users.js';

router.route('/').get(getUsers).post(createUser);

router.route('/:id').get(getUser);

router.route('/login').post(AuthenticateUser);

// Export the router
export { router as usersRoute };
