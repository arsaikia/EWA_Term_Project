import Cookie from 'js-cookie';
import { get, isEmpty } from 'lodash';
import React, { useContext, useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import ProductsScreen from './ProductsScreen';
import UserContext from '../../Context/User/userContext';
import AppContext from '../../Context/AppContext/appContext';

const ProductsController = ({ ...props }) => {
    /*
     ***************************************************
     * GLOBAL STATE FROM CONTEXT API
     ***************************************************
     */
    const appContext = useContext(AppContext);
    const { showHeader, setShowHeader } = appContext;

    const userContext = useContext(UserContext);
    const {
        authenticateUser,
        isUserAuthenticated,
        isAuthenticationAttempted,
        authenticationError,
        setlLoginFalse,
        allRegisteredUsers,
        allRegisteredUsersFetched,
        getAllRegisteredUsers,
        registerUser,
        loggedInUser,
    } = userContext;
    /********************************************
     * Local States
     ********************************************/

    const { productId } = useParams();

    useEffect(() => {
        console.log('In Products Controller', productId);
    }, []);

    useEffect(() => {
        setShowHeader(true);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /*
     * On Browser Back
     */
    window.onpopstate = (e) => {};

    return (
        <ProductsScreen
            isAuthenticationAttempted={isAuthenticationAttempted}
            isUserAuthenticated={isUserAuthenticated}
            authenticationError={authenticationError}
        />
    );
};

export { ProductsController };
