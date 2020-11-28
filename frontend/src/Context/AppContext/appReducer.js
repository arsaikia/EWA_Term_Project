import {
    SHOW_HEADER,
    HIDE_HEADER,
    SHOW_DROPDOWN,
    HIDE_DROPDOWN,
    SHOW_MAP,
    HIDE_MAP,
    SET_STORE,
} from '../types';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
    switch (action.type) {
        case SHOW_HEADER:
            return {
                ...state,
                showHeader: true,
            };

        case HIDE_HEADER:
            return {
                ...state,
                showHeader: false,
                showDropdown: false,
            };

        case SHOW_DROPDOWN:
            return {
                ...state,
                showDropdown: true,
            };

        case HIDE_DROPDOWN:
            return {
                ...state,
                showDropdown: false,
            };

        case SHOW_MAP:
            return {
                ...state,
                showMap: true,
            };

        case HIDE_MAP:
            return {
                ...state,
                showMap: false,
            };

        case SET_STORE:
            return {
                ...state,
                selectedStore: action.payload || {},
            };

        default:
            return state;
    }
};
