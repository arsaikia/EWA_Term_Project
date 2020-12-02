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
        updateUser,
        allRegisteredUsersFetched,
        getAllRegisteredUsers,
        allRegisteredUsers,
        makeManager,
    } = userContext;

    const cartContext = useContext(CartContext);

    const {
        userCards,
        getUserCards,
        userCardsFetched,
        userAddresses,
        getUserAddresses,
        userAddressesFetched,
        updateCard,
    } = cartContext;

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
    const userType = Cookie.get('USER_TYPE');

    const [fetchingAllUsers, setFetchingAllUsers] = useState(
        !allRegisteredUsersFetched
    );
    const [isLoading, setIsLoading] = useState(true);
    const [fetchingCards, setFetchingCards] = useState(!userCardsFetched);
    const [fetchingAddress, setFetchingAddress] = useState(
        userAddressesFetched
    );

    /*
     ***************************************************
     * Handler Functions
     ***************************************************
     */

    /*
     ***************************************************
     * LOADING AND PAGE POPULATION HANDLERS
     **************************************************
     */

    const onLoad = useCallback(() => {
        if (!allRegisteredUsersFetched && fetchingAllUsers) {
            setFetchingAllUsers(false);
            getAllRegisteredUsers();
        }
        if (!userCardsFetched && rememberedUserId && fetchingCards) {
            setFetchingCards(false);
            getUserCards(rememberedUserId);
        }

        if (!userAddressesFetched && rememberedUserId && fetchingAddress) {
            setFetchingAddress(false);
            getUserAddresses(rememberedUserId);
        }
    }, [userCardsFetched, rememberedUserId, getUserCards]);

    useEffect(() => {
        onLoad();
    }, [onLoad]);

    /*
     * On Browser Back
     */
    window.onpopstate = (e) => {};

    useEffect(() => {
        setShowHeader(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <AccountsScreen
                userType={userType}
                isUserAuthenticated={isUserAuthenticated}
                loggedInUser={loggedInUser}
                updateUser={updateUser}
                userCards={userCards}
                updateCard={updateCard}
                userAddresses={userAddresses}
                allRegisteredUsers={allRegisteredUsers}
                allRegisteredUsersFetched={allRegisteredUsersFetched}
                makeManager={makeManager}
                {...props}
            />
        </>
    );
};

export { AccountsController };
