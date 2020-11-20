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

    const userId = Cookie.get('userId');

    const [state, dispatch] = useReducer(UserReducer, initialState);

    /*
     *   AUTHENTICATE_USER
     */
    const authenticateUser = async (email, password) => {
        try {
            const response = await API.POST({
                url: 'users/login',
                body: { email, password },
            });
            const user = get(get(response, 'data'), 'data');
            const success = get(get(response, 'data'), 'success');

            console.log(user, 'success', success);

            Cookie.set('USER_NAME', get(user[0], 'firstName', ''));
            if (success) {
                dispatch({
                    payload: user,
                    type: AUTHENTICATE_USER,
                });
            }
        } catch (error) {
            console.log(error, 'errorMessage', error.message);
            const errorMessage = get(error, 'message');
            return dispatch({
                payload: errorMessage,
                type: AUTHENTICATION_ERROR,
            });
        }
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
            body: body,
        });

        const newUser = get(get(response, 'data') || '', 'data') || '';

        console.log(newUser, response.data.success);

        dispatch({
            payload: newUser,
            type: REGISTER_NEW_USER,
        });
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
            }}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserState;
