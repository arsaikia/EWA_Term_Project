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
    const userId = Cookie.get('USER_ID');
    const appContext = useContext(AppContext);
    const { setShowHeader } = appContext;

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
        productById,
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
        removeProuctsFetched,
        decrementProductsInCart,
    } = cartContext;
    /********************************************
     * Local States
     ********************************************/
    const rememberedUserId = Cookie.get('USER_ID');
    const [showShare, setShowShare] = useState(false);

    const [productsfetching, setProductsfetching] = useState(true);

    const [totalReview, setTotalReview] = useState({
        rating: null,
        count: null,
    });

    const { productId } = useParams();

    console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXX', productId);

    useEffect(() => {
        setShowHeader(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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

    function roundHalf(num) {
        return Math.round(num * 2) / 2;
    }

    const loadData = useCallback(() => {
        if (!productByIdFetched && productsfetching) {
            setProductsfetching(false);
            getProductById(productId);
        }

        if (productByIdFetched && !isEmpty(productById)) {
            let rating = 0;
            let count = 0;

            const reviews = get(productById, 'reviews', []);

            reviews.length > 0 &&
                reviews.forEach((review) => {
                    rating += review.reviewRating;
                    count += 1;
                });

            rating = roundHalf(rating / count);
            setTotalReview({ rating, count });
        }
    }, [productByIdFetched, getProductById, productId, productById]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    console.log('review', totalReview);
    /*
     * On Browser Back
     */
    window.onpopstate = (e) => {};

    if (!productByIdFetched || productsfetching) {
        return <Loader showLoader={true} />;
    }

    return (
        <ProductsScreen
            isAuthenticationAttempted={isAuthenticationAttempted}
            isUserAuthenticated={isUserAuthenticated}
            authenticationError={authenticationError}
            productById={productById}
            showShare={showShare}
            setShowShare={setShowShare}
            userId={userId}
            totalReview={totalReview}
            getItemsInBag={getItemsInBag}
            isAddedToCart={isAddedToCart}
            addProductToCart={addProductToCart}
            reduceProductsInCart={reduceProductsInCart}
        />
    );
};

export { ProductsController };
