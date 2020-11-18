import { GET_ALL_USERS, REGISTER_NEW_USER } from '../types';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
    switch (action.type) {
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
