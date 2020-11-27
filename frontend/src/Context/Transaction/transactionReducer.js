import {GET_TRANSACTION_WITH_ID} from '../types';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
    switch (action.type) {
        case GET_TRANSACTION_WITH_ID:
            return {
                ...state,
                userTransactions: action.payload,
                userTransactionsFetched: true,
            };

        default:
            return state;
    }
};
