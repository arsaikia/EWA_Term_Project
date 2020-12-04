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
import storeData from '../../utils/stores.json';
import API from '../../utils/Query';

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
        updateProductsInCart,
        mba,
        mbaFetched,
    } = cartContext;
    /********************************************
     * Local States
     ********************************************/

    const rememberedUserId = Cookie.get('USER_ID');
    const [isTransferCreating, setIsTransferCreating] = useState(false);
    const [showLoading, setShowLoading] = useState(false);

    const [totalPrice, setTotalPrice] = useState(0);
    const [fetchingAddress, setFetchingAddress] = useState(
        !userAddressesFetched
    );
    const [fetchingCards, setFetchingCards] = useState(!userCardsFetched);

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
    const [selectedCardId, setSelectedCardId] = useState('');

    const [allStores, setAllStores] = useState([]);
    const [allStoresCalculated, setAllStoresCalculated] = useState(false);

    const [selectedStore, setSelectedStore] = useState(); // Cookie.get('STORE_ID')

    /*
     ***************************************************
     * Handler Functions
     ***************************************************
     */

    const addProductToCart = (productId) => {
        if (!productId) return;
        if (!rememberedUserId) return history.push('/login');
        updateProductsInCart(rememberedUserId, productId);
    };

    const getButtonText = (step) => {
        if (step === 'ADD_PAYMENT') {
            if (
                !isEmpty(nameOnCard) &&
                !isEmpty(cardNumber) &&
                !isEmpty(expiry) &&
                !isEmpty(cvv) &&
                isEmpty(selectedCard)
            ) {
                return 'Add Payment';
            }
            if (isEmpty(selectedCard)) {
                return 'Select Payment';
            }
            return 'Confirm Payment';
        }

        if (step === 'ADD_ADDRESS') {
            if (
                !isEmpty(street) &&
                !isEmpty(city) &&
                !isEmpty(zip) &&
                !isEmpty(state) &&
                (isEmpty(selectedAddress) || !isEmpty(selectedStore))
            ) {
                return 'Add Address';
            }
            if (isEmpty(selectedAddress) && isEmpty(selectedStore)) {
                return 'Select Address';
            }
            return 'Checkout';
        }
    };

    const continueHandler = (val) => {
        if (val === 'Add Payment') {
            return addPayment();
        }
        if (val === 'Add Address') {
            return addAddress();
        }
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
            const addId =
                selectedAddressX.length > 0 &&
                get(selectedAddressX[0], 'addressId');
            const payId =
                selectedCardX.length > 0 && get(selectedCardX[0], 'cardId');

            // console.log('addId', addId, 'payId', payId);
            setSelectedAddressId(addId);
            setSelectedCardId(payId);
            setIsTransferCreating(true);
            setShowLoading(true);
        }
    };

    const addPayment = async () => {
        const res = await API.POST({
            url: `cards/${userId}`,
            body: {
                cardName: nameOnCard,
                cardNumber,
                expiryDate: expiry,
                cvv,
            },
        });

        let newCardId = get(res.data, 'data');
        newCardId = get(newCardId, 'cardId');
        setSelectedCard(newCardId);
        await getUserCards(userId);
        setCheckoutStep('ADD_ADDRESS');
    };

    const addAddress = async () => {
        const res = await API.POST({
            url: `addresses/${userId}`,
            body: {
                street1: street,
                city: city,
                zip: zip,
                state: state,
            },
        });

        let newAddressId = get(res.data, 'data');
        newAddressId = get(newAddressId, 'addressId');
        setSelectedAddress(newAddressId);
        await getUserAddresses(userId);
    };

    const initiateTransfer = useCallback(() => {
        if (
            isTransferCreating &&
            !transferCreated &&
            (!isEmpty(selectedAddressId) || !isEmpty(selectedStore)) &&
            !isEmpty(selectedCardId)
        ) {
            setIsTransferCreating(false);
            removedFetchedState();
            createTransfer(
                totalPrice,
                userId,
                selectedAddressId,
                selectedCardId,
                selectedStore
            );
        }

        if (transferCreated && !productsInCartFetched) {
            fetchProductsInCart(userId);
        }

        if (transferCreated && productsInCartFetched) {
            setShowLoading(false);
            history.push('/orderConfirmed', {
                totalPrice,
                userId,
                selectedAddressId,
                selectedCardId,
                selectedStore,
            });
        }
    }, [
        isTransferCreating,
        transferCreated,
        totalPrice,
        userId,
        selectedCardId,
        selectedAddressId,
        createTransfer,
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

    const findAllStores = useCallback(() => {
        if (!allStoresCalculated && isEmpty(allStores)) {
            setAllStoresCalculated(true);
            let stores = [];

            storeData &&
                storeData.forEach((store) => {
                    stores.push({
                        storeId: store.storeId,
                        storeName: store.street1,
                    });
                });
            setAllStores(stores);
            // console.log('storeData', stores);
        }
    }, []);

    useEffect(() => {
        findAllStores();
    }, [findAllStores]);

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
        !isEmpty(selectedStore) && Cookie.set('STORE_ID', selectedStore);
    }, [selectedStore]);

    useEffect(() => {
        if (!isEmpty(selectedCard) && !isEmpty(userCards)) {
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
        if (!isEmpty(selectedAddress) && !isEmpty(userAddresses)) {
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

    if (
        fetchingCards ||
        fetchingAddress ||
        !productsInCartFetched ||
        !userCardsFetched ||
        !userAddressesFetched ||
        !mbaFetched ||
        showLoading ||
        !allStoresCalculated
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
            mba={mba}
            addProductToCart={addProductToCart}
            allStores={allStores}
            selectedStore={selectedStore}
            setSelectedStore={setSelectedStore}
            props={props}
        />
    );
};

export { CartController };
