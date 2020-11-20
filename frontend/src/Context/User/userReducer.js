import {
    GET_ALL_USERS,
    REGISTER_NEW_USER,
    AUTHENTICATE_USER,
    AUTHENTICATION_ERROR,
    AUTHENTICATE_USER_FALSE,
} from '../types';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
    switch (action.type) {
        case AUTHENTICATE_USER:
            return {
                ...state,
                loggedInUser: action.payload[0],
                isUserAuthenticated: true,
                isAuthenticationAttempted: true,
                authenticationError: '',
            };

        case AUTHENTICATE_USER_FALSE:
            return {
                ...state,
                isUserAuthenticated: false,
            };

        case AUTHENTICATION_ERROR:
            return {
                ...state,
                isUserAuthenticated: false,
                isAuthenticationAttempted: true,
                authenticationError: action.payload,
            };

        case GET_ALL_USERS:
            return {
                ...state,
                allRegisteredUsers: action.payload,
                allRegisteredUsersFetched: true,
            };

        case REGISTER_NEW_USER:
            return {
                ...state,
                allRegisteredUsers: [
                    ...state.allRegisteredUsers,
                    action.payload,
                ],
            };

        default:
            return state;
    }
};
