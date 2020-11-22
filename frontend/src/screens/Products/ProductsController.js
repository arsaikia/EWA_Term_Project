import Cookie from 'js-cookie';
import { get, isEmpty } from 'lodash';
import React, { useContext, useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import ProductsScreen from './ProductsScreen';
import UserContext from '../../Context/User/userContext';
import AppContext from '../../Context/AppContext/appContext';
import CartContext from '../../Context/Cart/cartContext';
import { useHistory } from 'react-router-dom';
import Loader from '../../components/Loader';

const ProductsController = (props) => {
    const history = useHistory();
    /*
     ***************************************************
     * GLOBAL STATE FROM CONTEXT API
     ***************************************************
     */

    const appContext = useContext(AppContext);
    const { setShowHeader } = appContext;

    const cartContext = useContext(CartContext);
    const { productById, getProductById, productByIdFetched } = cartContext;

    const userContext = useContext(UserContext);
    const {
        authenticateUser,
        isUserAuthenticated,
        isAuthenticationAttempted,
        authenticationError,
        setLoginFalse,
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
        setShowHeader(true);

        if (!productByIdFetched) {
            getProductById(productId);
        }

        console.log('Products Controller', productId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /*
     * On Browser Back
     */
    window.onpopstate = (e) => {};

    if (!productByIdFetched) {
        return <Loader showLoader={true} />;
    }

    return (
        <ProductsScreen
            isAuthenticationAttempted={isAuthenticationAttempted}
            isUserAuthenticated={isUserAuthenticated}
            authenticationError={authenticationError}
            productById={productById}
        />
    );
};

export { ProductsController };
