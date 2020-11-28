import axios from 'axios';
import Cookie from 'js-cookie';
import { get } from 'lodash';
import React, { useReducer } from 'react';
import { v4 as uuid } from 'uuid';

import API from '../../utils/Query';
import { GET_TRANSACTION_WITH_ID, CREATE_REVIEW } from '../types';

import TransactionContext from './transactionContext';
import TransactionReducer from './transactionReducer';

const TransactionState = (props) => {
    const initialState = {
        userTransactions: {},
        userTransactionsFetched: false,
    };

    const [state, dispatch] = useReducer(TransactionReducer, initialState);

    /*
     *   GET_TRANSACTION_WITH_ID
     */
    const getUserTransactions = async (userId) => {
        let response = await API.GET({ url: `transactions/${userId}` });

        response = get(response.data, 'data');

        console.log('response', response);

        dispatch({
            payload: response,
            type: GET_TRANSACTION_WITH_ID,
        });
    };

    /*
     *   CREATE_REVIEW
     */

    const createReview = async (body) => {
        console.log('body', body);
        let response = await API.POST({ url: `reviews/`, body });

        console.log(response);

        // dispatch({
        //     payload: response,
        //     type: CREATE_REVIEW,
        // });
    };

    return (
        <TransactionContext.Provider
            value={{
                getUserTransactions,
                createReview,
                userTransactions: state.userTransactions,
                userTransactionsFetched: state.userTransactionsFetched,
            }}>
            {props.children}
        </TransactionContext.Provider>
    );
};

export default TransactionState;
