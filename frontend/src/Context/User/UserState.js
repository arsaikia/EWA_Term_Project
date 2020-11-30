import axios from 'axios';
import Cookie from 'js-cookie';
import { get } from 'lodash';
import React, { useReducer } from 'react';
import { v4 as uuid } from 'uuid';

import API from '../../utils/Query';
import {
    GET_ALL_USERS,
    REGISTER_NEW_USER,
    AUTHENTICATE_USER,
    AUTHENTICATION_ERROR,
    AUTHENTICATE_USER_FALSE,
} from '../types';

import UserContext from './userContext';
import UserReducer from './userReducer';

const UserState = (props) => {
    const initialState = {
        isUserAuthenticated: false,
        isAuthenticationAttempted: false,
        authenticationError: '',
        loggedInUser: {},
        allRegisteredUsers: [],
        allRegisteredUsersFetched: false,
    };

    const [state, dispatch] = useReducer(UserReducer, initialState);

    /*
     *   AUTHENTICATE_USER
     */
    const authenticateUser = async (email, password, rememberMe) => {
        try {
            const response = await API.POST({
                url: 'users/login',
                body: { email, password },
            });

            const user = get(get(response, 'data'), 'data');
            const success = get(get(response, 'data'), 'success');

            if (success) {
                Cookie.set('USER_NAME', get(user[0], 'firstName', ''));
                Cookie.set('USER_ID', get(user[0], 'userId', ''));
                Cookie.set(
                    'FOOD_PREFERENCE',
                    get(user[0], 'foodPreference', '')
                );
                Cookie.set('REMEMBER_ME', rememberMe, false);
                return dispatch({
                    payload: user,
                    type: AUTHENTICATE_USER,
                });
            }
        } catch (error) {
            const errorResponse = get(error, 'response');
            const errorData = get(errorResponse, 'data');
            const errMsg = get(errorData, 'error') || '';

            return dispatch({
                payload: errMsg,
                type: AUTHENTICATION_ERROR,
            });
        }
    };

    const setUserSemiAuthenticated = () => {};

    /*
     *   AUTHENTICATE_USER_FALSE
     */
    const setLoginFalse = () => {
        Cookie.set('USER_NAME', '');
        dispatch({
            type: AUTHENTICATE_USER_FALSE,
        });
    };

    /*
     *   GET_ALL_USERS
     */
    const getAllRegisteredUsers = async () => {
        const response = await API.GET({ url: 'users' });
        const allUsers = get(get(response, 'data'), 'data');

        dispatch({
            payload: allUsers,
            type: GET_ALL_USERS,
        });
    };

    /*
     *   REGISTER_NEW_USER
     */
    const registerUser = async (body) => {
        const response = await API.POST({
            url: 'users',
            body: { userId: uuid(), ...body },
        });

        const newUser = get(get(response, 'data') || '', 'data') || '';

        dispatch({
            payload: newUser,
            type: REGISTER_NEW_USER,
        });
    };

    /*
     *   update user store
     */
    const updateUserStore = async (userId, storeId) => {
        console.log(userId, storeId);
        await API.POST({
            url: `users/store/${userId}`,
            body: { storeId },
        });

        Cookie.set('USER_STORE', storeId);
    };

    return (
        <UserContext.Provider
            value={{
                isUserAuthenticated: state.isUserAuthenticated,
                allRegisteredUsers: state.allRegisteredUsers,
                allRegisteredUsersFetched: state.allRegisteredUsersFetched,
                isAuthenticationAttempted: state.isAuthenticationAttempted,
                authenticationError: state.authenticationError,
                loggedInUser: state.loggedInUser,
                getAllRegisteredUsers,
                registerUser,
                authenticateUser,
                setLoginFalse,
                setUserSemiAuthenticated,
                updateUserStore,
            }}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserState;
