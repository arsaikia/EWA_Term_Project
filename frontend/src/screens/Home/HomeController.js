import axios from 'axios';
import Cookie from 'js-cookie';
import { get, isEmpty } from 'lodash';
import React, { useContext, useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import HomeScreen from './HomeScreen';
import AppContext from '../../Context/AppContext/appContext';
import CartContext from '../../Context/Cart/cartContext';
import Loader from '../../components/Loader';
import UserContext from '../../Context/User/userContext';
import { useHistory } from 'react-router-dom';

const HomeController = ({ setShowDropdown, ...props }) => {
    const history = useHistory();
    /*
     ***************************************************
     * GLOBAL STATE FROM CONTEXT API
     ***************************************************
     */
    const appContext = useContext(AppContext);
    const { setShowHeader } = appContext;

    const userContext = useContext(UserContext);
    const {
        isUserAuthenticated,
        loggedInUser,
        setUserSemiAuthenticated,
    } = userContext;

    const cartContext = useContext(CartContext);
    const {
        fetchAllProducts,
        fetchProductsInCart,
        updateProductsInCart,
        allProducts,
        allProductsFetched,
        productsInCart,
        productsInCartFetched,
        getProductById,
        productById,
        removedFetchedState,
        productByIdFetched,
    } = cartContext;

    /*
     ***************************************************
     * LOCAL STATES
     ***************************************************
     */
    const rememberedUserId = Cookie.get('USER_ID');

    const comingFromProducts = get(props.location.state, 'fromProducts');

    const [fetchingAllProducts, setFetchingAllProducts] = useState(
        comingFromProducts || true
    );
    const [fetchingCart, setfetchingCart] = useState(
        comingFromProducts || true
    );

    // console.log('fromProducts', history.location.state);
    /*
     ***************************************************
     * Handler Functions
     ***************************************************
     */

    const validateRememberMe = useCallback(() => {
        const userId = Cookie.get('USER_NAME');
        const rememberMe = Cookie.get('REMEMBER_ME');

        if (rememberMe && userId) {
            setUserSemiAuthenticated(userId);
        }
    }, [setUserSemiAuthenticated]);

    const isAddedToCart = (productIdX) => {
        let containsInBag = false;
        productsInCart.forEach((el) => {
            if (el.productId === productIdX) {
                containsInBag = true;
                return;
            }
        });
        return containsInBag;
    };

    const goToProductsPage = (productId, productInStock) => () => {
        // Sanity Check
        if (isEmpty(productId) || productInStock <= 0) return;
        getProductById(productId);
        return props.history.push(`/products/${productId}`, {
            selectedProduct: productByIdFetched,
        });
    };

    const addProductToCart = (productId) => () => {
        if (!rememberedUserId || !productId) return;
        updateProductsInCart(rememberedUserId, productId);
    };

    const getItemsInBag = (productId) => {
        let retVal = '';
        productsInCart.forEach((product) => {
            if (product.productId === productId) {
                retVal = product.quantity;
                return;
            }
        });
        return retVal;
    };

    /*
     ***************************************************
     * LOADING AND PAGE POPULATION HANDLERS
     **************************************************
     */

    const loadDataOnMount = useCallback(() => {
        if (fetchingAllProducts && !allProductsFetched) {
            setFetchingAllProducts(false);
            fetchAllProducts();
        }

        if (fetchingCart && !productsInCartFetched) {
            setfetchingCart(false);
            fetchProductsInCart(rememberedUserId);
        }
    }, [
        fetchingAllProducts,
        allProductsFetched,
        fetchAllProducts,
        fetchingCart,
        productsInCartFetched,
        fetchProductsInCart,
        loggedInUser,
    ]);

    /*
     * On Browser Back
     */
    window.onpopstate = (e) => {};

    // Only on load

    useEffect(() => {
        if (fetchingAllProducts && allProductsFetched) {
            return removedFetchedState();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Check if we are in a Remember me session:
    useEffect(() => {
        validateRememberMe();
    }, [validateRememberMe]);

    useEffect(() => {
        setShowHeader(true);

        loadDataOnMount();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadDataOnMount]);

    useEffect(() => {
        isUserAuthenticated && console.log('loggedInUser', loggedInUser);
    }, [isUserAuthenticated, loggedInUser]);

    if (fetchingAllProducts || !allProductsFetched) {
        return <Loader showLoader />;
    }

    return (
        <>
            <HomeScreen
                setShowDropdown={setShowDropdown}
                updateProductsInCart={updateProductsInCart}
                allProducts={allProducts}
                allProductsFetched={allProductsFetched}
                productsInCart={productsInCart}
                productsInCartFetched={productsInCartFetched}
                isAddedToCart={isAddedToCart}
                goToProductsPage={goToProductsPage}
                addProductToCart={addProductToCart}
                getItemsInBag={getItemsInBag}
                {...props}
            />
        </>
    );
};

export { HomeController };
