import express from 'express';
const router = express.Router();

import {
    getUsers,
    getUser,
    createUser,
    AuthenticateUser,
    setUserPreferredStore,
    updateUser,
    makeStoreManager
} from '../controller/users.js';

router.route('/').get(getUsers).post(createUser);

router.route('/:id').get(getUser).put(updateUser);

router.route('/login').post(AuthenticateUser);

router.route('/store/:id').post(setUserPreferredStore);

router.route('/manager/:id').put(makeStoreManager);

// Export the router
export { router as usersRoute };
