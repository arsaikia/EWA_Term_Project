import axios from 'axios';
import Cookie from 'js-cookie';
import { get } from 'lodash';
import React, { useReducer } from 'react';
import { v4 as uuid } from 'uuid';

import API from '../../utils/Query';
import { GET_ALL_USERS, REGISTER_NEW_USER } from '../types';

import UserContext from './userContext';
import UserReducer from './userReducer';

const UserState = (props) => {
    const initialState = {
        allRegisteredUsers: [],
        allRegisteredUsersFetched: false,
    };

    const userId = Cookie.get('userId');

    const [state, dispatch] = useReducer(UserReducer, initialState);

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
                allRegisteredUsers: state.allRegisteredUsers,
                allRegisteredUsersFetched: state.allRegisteredUsersFetched,
                getAllRegisteredUsers,
                registerUser,
            }}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserState;
