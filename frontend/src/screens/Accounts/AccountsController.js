import axios from 'axios';
import Cookie from 'js-cookie';
import { get, isEmpty } from 'lodash';
import React, { useContext, useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import AccountsScreen from './AccountsScreen';
import AppContext from '../../Context/AppContext/appContext';
import CartContext from '../../Context/Cart/cartContext';
import TransactionContext from '../../Context/Transaction/transactionContext';
import Loader from '../../components/Loader';
import UserContext from '../../Context/User/userContext';
import { useHistory } from 'react-router-dom';

const AccountsController = ({
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

    const reviewSubmitHandler = () => {
        const b = {
            userId: 'f1877d11-66d0-432b-b879-568557ee1761',
            orderId: '812b402f-c532-4099-8d46-8dfded6144b8',
            userName: 'Akshay Akshay',
            productId: '0b00b3f2-4f09-4987-8c0a-d99567c87c28',
            reviewRating: 3.5,
            reviewText: 'A really nice product overall!',
        };
        createReview(b);
    };

    /*
     ***************************************************
     * LOADING AND PAGE POPULATION HANDLERS
     **************************************************
     */

    const loadData = useCallback(() => {
        if (
            isLoading &&
            !userTransactionsFetched &&
            !isEmpty(rememberedUserId)
        ) {
            setIsLoading(false);
            getUserTransactions(rememberedUserId);
        }
    }, [
        isLoading,
        userTransactionsFetched,
        rememberedUserId,
        setIsLoading,
        getUserTransactions,
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
            <AccountsScreen
                userTransactions={userTransactions}
                reviewSubmitHandler={reviewSubmitHandler}
                {...props}
            />
        </>
    );
};

export { AccountsController };
