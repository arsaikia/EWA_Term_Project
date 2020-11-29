import axios from 'axios';
import Cookie from 'js-cookie';
import { get } from 'lodash';
import React, { useReducer } from 'react';
import { v4 as uuid } from 'uuid';

import API from '../../utils/Query';
import {
    GET_TRANSACTION_WITH_ID,
    CREATE_REVIEW,
    GET_REVIEW_BY_USER,
} from '../types';

import TransactionContext from './transactionContext';
import TransactionReducer from './transactionReducer';

const TransactionState = (props) => {
    const initialState = {
        userTransactions: {},
        userTransactionsFetched: false,
        userReviews: {},
        userReviewsFetched: false,
    };

    const [state, dispatch] = useReducer(TransactionReducer, initialState);

    /*
     *   GET_TRANSACTION_WITH_ID
     */
    const getUserTransactions = async (userId) => {
        let response = await API.GET({ url: `transactions/${userId}` });

        response = get(response.data, 'data');

        dispatch({
            payload: response,
            type: GET_TRANSACTION_WITH_ID,
        });
    };

    /*
     *   CREATE_REVIEW
     */

    const createReview = async (body) => {
        await API.POST({ url: `reviews/`, body });
    };

    /*
     *GET_REVIEW_BY_USER
     */

    const getReviewByUser = async (userId) => {
        let response = await API.GET({ url: `reviews/user/${userId}` });

        response = get(response.data, 'data');

        dispatch({
            payload: response,
            type: GET_REVIEW_BY_USER,
        });
    };

    const updateTransactionStatus = async (
        transactionId,
        deliveryStatus,
        cancelReason
    ) => {
        console.log(transactionId, deliveryStatus, cancelReason);
        await API.POST({
            url: `transactions/${transactionId}`,
            body: { deliveryStatus, cancelReason },
        });
    };

    return (
        <TransactionContext.Provider
            value={{
                getUserTransactions,
                createReview,
                updateTransactionStatus,
                getReviewByUser,
                userTransactions: state.userTransactions,
                userTransactionsFetched: state.userTransactionsFetched,
                userReviews: state.userReviews,
                userReviewsFetched: state.userReviewsFetched,
            }}>
            {props.children}
        </TransactionContext.Provider>
    );
};

export default TransactionState;
