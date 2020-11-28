import axios from 'axios';
import Cookie from 'js-cookie';
import { get, isEmpty } from 'lodash';
import React, { useContext, useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import OrdersScreen from './OrdersScreen';
import AppContext from '../../Context/AppContext/appContext';
import CartContext from '../../Context/Cart/cartContext';
import TransactionContext from '../../Context/Transaction/transactionContext';
import Loader from '../../components/Loader';
import UserContext from '../../Context/User/userContext';
import { useHistory } from 'react-router-dom';

const OrdersController = ({
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
    } = userContext;

    const transactionContext = useContext(TransactionContext);
    const {
        getUserTransactions,
        userTransactions,
        userTransactionsFetched,
        createReview,
        getReviewByUser,
        userReviews,
        userReviewsFetched,
    } = transactionContext;

    /*
     ***************************************************
     * LOCAL STATES
     ***************************************************
     */
    const rememberedUserId = Cookie.get('USER_ID');
    const rememberedFoodPreference = Cookie.get('FOOD_PREFERENCE');
    const rememberMe = Cookie.get('REMEMBER_ME');

    const [isLoading, setIsLoading] = useState(true);

    /*
     ***************************************************
     * Handler Functions
     ***************************************************
     */

    const reviewSubmitHandler = (
        orderId,
        productId,
        reviewRating,
        reviewText
    ) => {
        const b = {
            userId: Cookie.get('USER_ID'),
            orderId,
            userName: Cookie.get('USER_NAME'),
            productId,
            reviewRating,
            reviewText,
        };

        createReview(b);
    };

    /*
     ***************************************************
     * LOADING AND PAGE POPULATION HANDLERS
     **************************************************
     */

    const reloadDataAfterReview = () => {
        getUserTransactions(rememberedUserId);
        getReviewByUser(rememberedUserId);
    };

    const loadData = useCallback(() => {
        if (
            isLoading &&
            !userTransactionsFetched &&
            !userReviewsFetched &&
            !isEmpty(rememberedUserId)
        ) {
            setIsLoading(false);
            getUserTransactions(rememberedUserId);
            getReviewByUser(rememberedUserId);
        }
    }, [
        isLoading,
        userTransactionsFetched,
        rememberedUserId,
        setIsLoading,
        getUserTransactions,
        userReviewsFetched,
        getReviewByUser,
    ]);

    /*
     * On Browser Back
     */
    window.onpopstate = (e) => {};

    // Only on load

    useEffect(() => {
        setShowHeader(true);
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadData]);

    if (isLoading && !userTransactionsFetched) {
        return <Loader showLoader={true} />;
    }

    return (
        <>
            <OrdersScreen
                userTransactions={userTransactions}
                reloadDataAfterReview={reloadDataAfterReview}
                reviewSubmitHandler={reviewSubmitHandler}
                userReviews={userReviews}
                {...props}
            />
        </>
    );
};

export { OrdersController };
