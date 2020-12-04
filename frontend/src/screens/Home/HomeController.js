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
import storeData from '../../utils/stores.json';

const HomeController = ({
    setShowDropdown,
    showMap,
    setShowMap,
    setStore,
    ...props
}) => {
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
        updateUserStore,
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
        getFilteredProducts,
        removedFetchedState,
        productByIdFetched,
        transferCreated,
        clearTransferStatus,
        decrementProductsInCart,
        getAllTweetDeals,
        tweetDeals,
        tweetDealsFetched,
    } = cartContext;

    /*
     ***************************************************
     * LOCAL STATES
     ***************************************************
     */
    const rememberedUserId = Cookie.get('USER_ID');
    const rememberedFoodPreference = Cookie.get('FOOD_PREFERENCE');
    const rememberMe = Cookie.get('REMEMBER_ME');
    const [foodPreferenceFetched, setFoodPreferenceFetched] = useState(
        allProductsFetched
    );

    const comingFromProducts = get(props.location.state, 'fromProducts');

    const [fetchingAllProducts, setFetchingAllProducts] = useState(
        comingFromProducts || !allProductsFetched
    );
    const [fetchingCart, setfetchingCart] = useState(
        comingFromProducts || true
    );

    const [defaultCoordinates, setDefaultCoordinates] = useState([
        -87.61624,
        41.80908,
    ]);
    const [selectedPark, setSelectedPark] = useState(null);

    const [loadingTweets, setLoadingTweets] = useState(!tweetDealsFetched);
    /*
     ***************************************************
     * Handler Functions
     ***************************************************
     */

    useEffect(() => {
        setFoodPreferenceFetched(allProductsFetched);
    }, [allProductsFetched]);

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

    const addProductToCart = (productId) => {
        if (!productId) return;
        if (!rememberedUserId) return history.push('/login');
        updateProductsInCart(rememberedUserId, productId);
    };

    const reduceProductsInCart = (productId) => {
        if (!productId) return;
        if (!rememberedUserId) return history.push('/login');
        decrementProductsInCart(rememberedUserId, productId);
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
    const prefStore = Cookie.get('STORE_ID');
    const loadDataOnMount = useCallback(() => {
        if (prefStore) {
            const storeDetails = storeData.filter((store) => {
                return store.storeId === prefStore;
            });
            if (storeDetails.length > 0) {
                setStore(storeDetails[0]);
                setSelectedPark(storeDetails[0]);
            }
        }

        if (allProductsFetched) {
            setFetchingAllProducts(false);
        }
        if (fetchingAllProducts && !allProductsFetched) {
            setFetchingAllProducts(false);
            fetchAllProducts();
        }

        if (fetchingCart && !productsInCartFetched && rememberedUserId) {
            setfetchingCart(false);
            fetchProductsInCart(rememberedUserId);
        }
        if (
            allProductsFetched &&
            !foodPreferenceFetched &&
            rememberedFoodPreference
        ) {
            setFoodPreferenceFetched(true);
            getFilteredProducts(rememberedFoodPreference, 'USER_PREFERENCE');
        }

        if (loadingTweets && !tweetDealsFetched) {
            setLoadingTweets(false);
            getAllTweetDeals();
        }
    }, [
        isUserAuthenticated,
        loggedInUser,
        fetchingAllProducts,
        allProductsFetched,
        fetchAllProducts,
        fetchingCart,
        productsInCartFetched,
        fetchProductsInCart,
        rememberedUserId,
        foodPreferenceFetched,
        rememberedFoodPreference,
        getFilteredProducts,
        tweetDealsFetched,
    ]);

    useEffect(() => {
        getFilteredProducts('', 'CATEGORY');
        getFilteredProducts('', 'SUB_CATEGORY');
    }, []);
    /*getFilteredProducts
     * On Browser Back
     */
    window.onpopstate = (e) => {};

    // Only on load

    useEffect(() => {
        if (fetchingAllProducts && allProductsFetched) {
            return removedFetchedState();
        }
        if (transferCreated) clearTransferStatus();
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

    if (
        fetchingAllProducts ||
        !allProductsFetched ||
        loadingTweets ||
        !tweetDealsFetched
    ) {
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
                reduceProductsInCart={reduceProductsInCart}
                getItemsInBag={getItemsInBag}
                fetchAllProducts={fetchAllProducts}
                getFilteredProducts={getFilteredProducts}
                showMap={showMap}
                setShowMap={setShowMap}
                setStore={setStore}
                updateUserStore={updateUserStore}
                defaultCoordinates={defaultCoordinates}
                setDefaultCoordinates={setDefaultCoordinates}
                selectedPark={selectedPark}
                setSelectedPark={setSelectedPark}
                tweetDeals={tweetDeals}
                {...props}
            />
        </>
    );
};

export { HomeController };
