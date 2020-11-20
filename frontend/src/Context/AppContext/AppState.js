import axios from 'axios';
import Cookie from 'js-cookie';
import { get } from 'lodash';
import React, { useReducer } from 'react';
import { v4 as uuid } from 'uuid';

import FRUIT from '../../Images/products/fruit_orange.png';
import CAKE from '../../Images/products/food_cake.png';

import API from '../../utils/Query';
import {
    SHOW_HEADER,
    HIDE_HEADER,
    SHOW_DROPDOWN,
    HIDE_DROPDOWN,
    GET_ALL_PRODUCTS,
} from '../types';

import AppContext from './appContext';
import AppReducer from './appReducer';

const AppState = (props) => {
    const initialState = {
        showHeader: false,
        showDropdown: false,
    };

    const [state, dispatch] = useReducer(AppReducer, initialState);

    /*
     *   SHOW_HEADER
     */

    const setShowHeader = (val) => {
        dispatch({
            type: val ? SHOW_HEADER : HIDE_HEADER,
        });
    };

    /*
     *   SHOW_DROPDOWN
     */

    const setShowDropdown = (val) => {
        dispatch({
            type: val ? SHOW_DROPDOWN : HIDE_DROPDOWN,
        });
    };

    return (
        <AppContext.Provider
            value={{
                showHeader: state.showHeader,
                setShowHeader,
                showDropdown: state.showDropdown,
                setShowDropdown,
            }}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppState;
