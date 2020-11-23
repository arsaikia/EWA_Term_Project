import axios from 'axios';
import Cookie from 'js-cookie';
import { get, isEmpty } from 'lodash';
import React, { useContext, useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import CartScreen from './CartScreen';
import Loader from '../../components/Loader';
import UserContext from '../../Context/User/userContext';
import CartContext from '../../Context/Cart/cartContext';
import { useHistory } from 'react-router-dom';

const CartController = ({ ...props }) => {
    const history = useHistory();
    /*
     ***************************************************
     * GLOBAL STATE FROM CONTEXT API
     ***************************************************
     */
    const userId = Cookie.get('USER_ID');
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

    const cartContext = useContext(CartContext);
    const {
        productsInCart,
        fetchProductsInCart,
        productsInCartFetched,
        cartCount,
        deleteCartItemWithId,
    } = cartContext;
    /********************************************
     * Local States
     ********************************************/
    const [totalPrice, setTotalPrice] = useState(0);

    /*
     ***************************************************
     * Handler Functions
     ***************************************************
     */

    const deleteCartItem = (cartId) => () => {
        if (!userId || !cartId) return;
        return deleteCartItemWithId(cartId, userId);
    };

    const calculatePrice = (price, discount) => {
        return (
            Math.round((price * (1 - discount / 100) + Number.EPSILON) * 100) /
            100
        );
    };

    useEffect(() => {
        userId && isEmpty(productsInCart) && fetchProductsInCart(userId);
    }, []);

    useEffect(() => {
        if (productsInCartFetched && !isEmpty(productsInCart)) {
            let total = 0;
            productsInCart.forEach((product) => {
                const qty = get(product, 'quantity', 0);
                const currProduct = get(product, 'product', {});
                const productPrice = get(currProduct, 'price', 0);
                const discount = get(currProduct, 'discount', 0);
                total += calculatePrice(productPrice, discount) * qty;
            });

            setTotalPrice(total);
        }
    }, [productsInCartFetched, productsInCart]);

    console.log('productsInCart', productsInCart, 'count', cartCount);

    if (!productsInCartFetched) {
        return <Loader showLoader={true} />;
    }

    return (
        <CartScreen
            isUserSemiAuthenticated={!isEmpty(userId)}
            history={history}
            props={props}
            productsInCartFetched={productsInCartFetched}
            productsInCart={productsInCart}
            calculatePrice={calculatePrice}
            totalPrice={totalPrice}
            deleteCartItem={deleteCartItem}
        />
    );
};

export { CartController };
