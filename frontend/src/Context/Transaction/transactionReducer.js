import {
    GET_TRANSACTION_WITH_ID,
    GET_REVIEW_BY_USER,
    GET_ALL_MARKET_BASKET,
} from '../types';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
    switch (action.type) {
        case GET_TRANSACTION_WITH_ID:
            return {
                ...state,
                userTransactions: action.payload,
                userTransactionsFetched: true,
            };

        case GET_REVIEW_BY_USER:
            return {
                ...state,
                userReviews: action.payload,
                userReviewsFetched: true,
            };

        case GET_ALL_MARKET_BASKET:
            return {
                ...state,
                allMBA: action.payload,
                allMBAFetched: true,
            };

        default:
            return state;
    }
};
