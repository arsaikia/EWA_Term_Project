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
        createTransfer,
        transferCreated,
        deleteCartItemWithId,
        getUserCards,
        userCards,
        userCardsFetched,
        getUserAddresses,
        userAddresses,
        userAddressesFetched,
        removedFetchedState,
        clearTransferStatus,
    } = cartContext;
    /********************************************
     * Local States
     ********************************************/

    const [isTransferCreating, setIsTransferCreating] = useState(false);
    const [showLoading, setShowLoading] = useState(false);

    const [totalPrice, setTotalPrice] = useState(0);
    const [fetchingAddress, setFetchingAddress] = useState(true);
    const [fetchingCards, setFetchingCards] = useState(true);

    const [selectedCard, setSelectedCard] = useState('');
    const [nameOnCard, setNameOnCard] = useState('');
    const [cardNumber, setCardNumber] = useState();
    const [expiry, setExpiry] = useState(null);
    const [cvv, setCvv] = useState(null);

    const [nameError, setNameError] = useState(false);
    const [numberErr, setNumberErr] = useState(false);
    const [expirtErr, setExpiryErr] = useState(false);
    const [cvvErr, setCvvErr] = useState(false);

    const [checkoutStep, setCheckoutStep] = useState('ADD_PAYMENT');

    const [selectedAddress, setSelectedAddress] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [zip, setZip] = useState();
    const [state, setState] = useState('');

    const [selectedAddressId, setSelectedAddressId] = useState('');
    const [selectedCardId, setselectedCardId] = useState('');

    /*
     ***************************************************
     * Handler Functions
     ***************************************************
     */

    const getButtonText = (step) => {
        if (step === 'ADD_PAYMENT') {
            if (isEmpty(selectedCard)) {
                return 'Select Payment';
            }
            return 'Confirm Payment';
        }

        if (step === 'ADD_ADDRESS') {
            if (isEmpty(selectedAddress)) {
                return 'Select Address';
            }
            return 'Checkout';
        }
    };

    const continueHandler = (val) => {
        if (val === 'Confirm Payment') {
            return setCheckoutStep('ADD_ADDRESS');
        }
        if (val === 'Checkout') {
            const selectedCardX = userCards.filter(
                (card) => card.cardId === selectedCard
            );
            const selectedAddressX = userAddresses.filter(
                (address) => address.addressId === selectedAddress
            );
            const addId = get(selectedAddressX[0], 'addressId');

            setSelectedAddressId(addId);

            setIsTransferCreating(true);
            setShowLoading(true);

            return console.log(
                'Complete Address and Payment',
                addId,
                selectedCardX[0]
            );
        }
    };

    const initiateTransfer = useCallback(() => {
        if (
            isTransferCreating &&
            !transferCreated &&
            !isEmpty(selectedAddressId)
        ) {
            setIsTransferCreating(false);
            removedFetchedState();
            createTransfer(totalPrice, userId, selectedAddressId);
        }

        if (transferCreated && !productsInCartFetched) {
            fetchProductsInCart(userId);
        }

        if (transferCreated && productsInCartFetched) {
            clearTransferStatus();
            setShowLoading(false);
            history.push('/home');
        }
    }, [
        isTransferCreating,
        transferCreated,
        totalPrice,
        userId,
        selectedAddressId,
        createTransfer,
        clearTransferStatus,
        fetchProductsInCart,
        history,
        productsInCartFetched,
        removedFetchedState,
    ]);

    useEffect(() => {
        initiateTransfer();
    }, [initiateTransfer]);

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

    const getAllCards = useCallback(() => {
        if (fetchingCards && !userCardsFetched && userId) {
            setFetchingCards(false);
            getUserCards(userId);
        }
        if (fetchingAddress && !userAddressesFetched && userId) {
            setFetchingAddress(false);
            getUserAddresses(userId);
        }
    }, [
        fetchingCards,
        fetchingAddress,
        getUserCards,
        getUserAddresses,
        userCardsFetched,
        userAddressesFetched,
        userId,
    ]);

    useEffect(() => {
        getAllCards();
    }, [getAllCards]);

    useEffect(() => {
        if (!isEmpty(selectedCard)) {
            const selected = userCards.filter(
                (card) => card.cardId === selectedCard
            );
            setNameOnCard(get(selected[0], 'cardName'));
            setCardNumber(get(selected[0], 'cardNumber'));
            setExpiry(get(selected[0], 'expiryDate'));
            setCvv(get(selected[0], 'cvv'));

            setNameError(false);
            setNumberErr(false);
            setExpiryErr(false);
            setCvvErr(false);
        }
    }, [selectedCard, userCards]);

    useEffect(() => {
        if (!isEmpty(selectedAddress)) {
            const selected = userAddresses.filter(
                (address) => address.addressId === selectedAddress
            );
            setStreet(get(selected[0], 'street1'));
            setCity(get(selected[0], 'city'));
            setZip(get(selected[0], 'zip'));
            setState(get(selected[0], 'state'));

            setNameError(false);
            setNumberErr(false);
            setExpiryErr(false);
            setCvvErr(false);
        }
    }, [selectedAddress, userAddresses]);

    console.log("showLoading", showLoading, fetchingCards)
    if (
        fetchingCards ||
        fetchingAddress ||
        !productsInCartFetched ||
        !userCardsFetched ||
        !userAddressesFetched ||
        showLoading
    ) {
        return <Loader showLoader={true} />;
    }

    return (
        <CartScreen
            isUserSemiAuthenticated={!isEmpty(userId)}
            history={history}
            productsInCartFetched={productsInCartFetched}
            productsInCart={productsInCart}
            calculatePrice={calculatePrice}
            totalPrice={totalPrice}
            deleteCartItem={deleteCartItem}
            userCards={userCards}
            setSelectedCard={setSelectedCard}
            selectedCard={selectedCard}
            nameOnCard={nameOnCard}
            setNameOnCard={setNameOnCard}
            cardNumber={cardNumber}
            setCardNumber={setCardNumber}
            expiry={expiry}
            setExpiry={setExpiry}
            cvv={cvv}
            setCvv={setCvv}
            nameError={nameError}
            setNameError={setNameError}
            numberErr={numberErr}
            setNumberErr={setNumberErr}
            expirtErr={expirtErr}
            setExpiryErr={setExpiryErr}
            cvvErr={cvvErr}
            setCvvErr={setCvvErr}
            getButtonText={getButtonText}
            checkoutStep={checkoutStep}
            setCheckoutStep={setCheckoutStep}
            userAddresses={userAddresses}
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
            street={street}
            city={city}
            zip={zip}
            state={state}
            setStreet={setStreet}
            setCity={setCity}
            setZip={setZip}
            setState={setState}
            continueHandler={continueHandler}
            props={props}
        />
    );
};

export { CartController };
