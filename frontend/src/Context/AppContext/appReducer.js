import {
    SHOW_HEADER,
    HIDE_HEADER,
    SHOW_DROPDOWN,
    HIDE_DROPDOWN,
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
                showHeader: false,
                showDropdown: false,
            };

        default:
            return state;
    }
};
