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
    const [showShare, setShowShare] = useState(false);

    const [totalReview, setTotalReview] = useState({
        rating: null,
        count: null,
    });

    const { productId } = useParams();

    useEffect(() => {
        setShowHeader(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function roundHalf(num) {
        return Math.round(num * 2) / 2;
    }

    const loadData = useCallback(() => {
        if (!productByIdFetched) {
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

    if (!productByIdFetched) {
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
        />
    );
};

export { ProductsController };
