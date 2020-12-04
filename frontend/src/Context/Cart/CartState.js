import axios from 'axios';
import Cookie from 'js-cookie';
import { get, isEmpty, pick } from 'lodash';
import React, { useReducer, useState } from 'react';
import { v4 as uuid } from 'uuid';

import { formatDate, getRandomArbitrary } from '../../utils/Functions';

import API from '../../utils/Query';
import {
    GET_ALL_PRODUCTS,
    GET_PRODUCTS_IN_CART,
    UPDATE_CART,
    FILTER_PRODUCTS,
    GET_PRODUCT_BY_ID,
    REMOVE_FETCHED_STATE,
    SET_CART_COUNT,
    GET_USER_ADDRESSES,
    GET_USER_CARDS,
    CREATE_TRANSFER,
    RESET_CREATE_TRANSFER,
    GET_MARKET_BASKET_ANALYSIS,
    GET_ALL_STORE_PRODUCTS,
    GET_ALL_NON_STORE_PRODUCTS,
    ADD_STORE_PRODUCT,
    GET_ALL_TWEET_DEALS,
} from '../types';

import CartContext from './cartContext';
import CartReducer from './cartReducer';

const CartState = (props) => {
    const initialState = {
        originalProducts: [],
        allProducts: [],
        allProductsFetched: false,
        productById: {},
        productByIdFetched: false,
        searchProducts: [],
        searchProductsFetched: false,
        productsInCart: [],
        productsInCartFetched: false,
        cartCount: 0,
        userCards: [],
        userCardsFetched: false,
        userAddresses: [],
        userAddressesFetched: false,
        transferCreated: false,
        lastTransfer: {},
        mba: {},
        mbaFetched: false,
        storeProducts: [],
        storeProductsFetched: false,
        storeNotProducts: [],
        storeNotProductsFetched: false,
        tweetDeals: [],
        tweetDealsFetched: false,
    };

    const [filters, setFilters] = useState({});

    const [state, dispatch] = useReducer(CartReducer, initialState);

    /*
     *   Get All Products
     */

    const fetchAllProducts = async (
        storeId = '706ab483-b96f-4b88-81ed-66b7beca5f5a'
    ) => {
        await removedFetchedState();
        const response = await API.GET({ url: `products/store/${storeId}` });
        const products = get(get(response, 'data'), 'data') || [];
        dispatch({
            payload: products,
            type: GET_ALL_PRODUCTS,
        });
    };

    const removedFetchedState = () => {
        dispatch({
            type: REMOVE_FETCHED_STATE,
        });
    };

    const getProductById = async (productId) => {
        const response = await API.GET({ url: `products/${productId}` });
        const product = get(get(response, 'data'), 'data');
        const productDetails = get(get(product, 'product', []), '0', {});
        const reviews = get(product, 'reviews', []);

        const withReviews = { ...productDetails, reviews };

        // console.log('withReviews', withReviews);
        dispatch({
            payload: withReviews,
            type: GET_PRODUCT_BY_ID,
        });
    };

    // FILTER_PRODUCTS
    const getFilteredProducts = async (searchKey, filterBy) => {
        let filteredProducts = state.originalProducts;
        const newFilter = {};
        newFilter[filterBy] = searchKey;
        let currentFilters = filterBy ? { ...filters, ...newFilter } : filters;
        setFilters(currentFilters);

        // Filter By user preference
        const userPref = get(currentFilters, 'USER_PREFERENCE');
        if (!isEmpty(userPref) && userPref !== 'ALL') {
            filteredProducts = filteredProducts.filter((product) => {
                return product.foodPreference === userPref;
            });
        }

        // Filter By  STORE
        const storeSelected = get(currentFilters, 'STORE');
        if (!isEmpty(storeSelected)) {
            filteredProducts = filteredProducts.filter((product) => {
                return product.storeId === storeSelected;
            });
        }

        if (filterBy === 'SUB_CATEGORY') {
            currentFilters.CATEGORY = '';
        } else if (filterBy === 'CATEGORY') {
            currentFilters.SUB_CATEGORY = '';
        }

        // Filter by category
        const category = get(currentFilters, 'CATEGORY');
        if (!isEmpty(category)) {
            filteredProducts = filteredProducts.filter(
                (product) => product.category === category
            );
        }

        // Filter by sub-category
        const subcategory = get(currentFilters, 'SUB_CATEGORY');
        if (!isEmpty(subcategory)) {
            filteredProducts = filteredProducts.filter(
                (product) => product.subcategory === subcategory
            );
        }

        // For searching by name: do API call -> will fetch all products
        const foodPref = get(currentFilters, 'NAME');

        if (!isEmpty(foodPref)) {
            filteredProducts = filteredProducts.filter((product) => {
                const regex = new RegExp(foodPref, 'i');

                return regex.test(product.productName);
            });
        }

        // const response = await API.GET({
        //     url: `products/matches/${searchKey}`,
        // });
        // const products = get(get(response, 'data'), 'data') || [];

        // console.log(
        //     'Products After Filters',
        //     currentFilters,
        //     filteredProducts.length
        // );

        dispatch({
            payload: filteredProducts,
            type: FILTER_PRODUCTS,
        });
    };

    const fetchProductsInCart = async (userId) => {
        const response = await API.GET({ url: `carts/${userId}` });
        const cart = get(get(response, 'data'), 'data') || [];

        let qty = 0;
        cart.forEach((product) => (qty += product.quantity));

        let marketBasketTofetch = [];
        cart.forEach((product) => {
            let currProduct = get(product, 'product');
            currProduct = get(currProduct, 'productId');
            marketBasketTofetch.push(currProduct);
        });

        let mbaSuggestions = await API.POST({
            url: `marketbasket/`,
            // body: {
            //     products: [
            //         '01cc8113-b28e-4cc2-9ce0-97328af6be65',
            //         '0a561b6a-6816-4d43-8b2b-c560d2ba40ef',
            //         '0b1649ea-74d1-4336-a4f1-f7ac93102698',
            //     ],
            // },
            body: {
                products: marketBasketTofetch,
            },
        });
        mbaSuggestions = get(get(mbaSuggestions, 'data'), 'data', []);

        let mbaSuggestionsProducts = await API.POST({
            url: `products/`,
            body: {
                products: mbaSuggestions,
            },
        });

        mbaSuggestionsProducts = get(
            get(mbaSuggestionsProducts, 'data'),
            'data',
            []
        );

        const allCartProducts = new Set();
        cart.forEach((cart) => allCartProducts.add(cart.productId));

        const uniqueSuggestions = [];
        mbaSuggestionsProducts.forEach((mba) => {
            if (!allCartProducts.has(mba.productId)) {
                uniqueSuggestions.push(mba);
            }
        });

        dispatch({
            payload: uniqueSuggestions,
            type: GET_MARKET_BASKET_ANALYSIS,
        });

        dispatch({
            payload: qty,
            type: SET_CART_COUNT,
        });

        dispatch({
            payload: cart,
            type: GET_PRODUCTS_IN_CART,
        });
    };

    const updateProductsInCart = async (userId, productId) => {
        await API.POST({
            url: `carts/`,
            body: { cartId: uuid(), userId, productId, quantity: 1 },
        });
        // await fetchAllProducts();
        await fetchProductsInCart(userId);
    };

    const decrementProductsInCart = async (userId, productId) => {
        await API.POST({
            url: `carts/update/`,
            body: { userId, productId },
        });
        // await fetchAllProducts();
        await fetchProductsInCart(userId);
    };

    const deleteCartItemWithId = async (cartId, userId) => {
        await API.DELETE({ url: `carts/${cartId}` });

        fetchProductsInCart(userId);
    };

    /*
     * GET_USER_CARDS
     */
    const getUserCards = async (id) => {
        console.log('I am here', id);
        const cards = await API.GET({
            url: `cards/${id}`,
        });

        const allCards = get(get(cards, 'data'), 'data');

        dispatch({
            payload: allCards,
            type: GET_USER_CARDS,
        });
    };

    /*
     * UPDATE_CARD
     */
    const updateCard = async (id, body, userId) => {
        await API.PUT({
            url: `cards/${id}`,
            body: body,
        });

        return getUserCards(userId);
    };

    /*
     *GET_USER_CARDS
     */

    const getUserAddresses = async (id) => {
        const addresses = await API.GET({
            url: `addresses/${id}`,
        });
        const allAddresses = get(get(addresses, 'data'), 'data');
        dispatch({
            payload: allAddresses,
            type: GET_USER_ADDRESSES,
        });
    };
    /*
     *CREATE_TRANSFER formatDate
     */

    const createTransfer = async (
        totalPrice,
        userId,
        addressId,
        cardId,
        storeId
    ) => {
        const expectedDeliveryDate = formatDate(
            new Date(
                new Date().setDate(
                    new Date().getDate() + getRandomArbitrary(7, 15)
                )
            ).toISOString()
        );

        const response = await API.POST({
            url: `transactions/`,
            body: {
                purchaseDate: formatDate(new Date()),
                totalPrice: totalPrice,
                deliveryForcast: expectedDeliveryDate,
                deliveryMethod: !isEmpty(storeId) ? 'STORE' : 'HOME',
                userId: userId,
                addressId: isEmpty(storeId) ? addressId : null,
                storeId: storeId !== '' ? storeId : null,
                cardId: cardId,
            },
        });

        const transaction = get(get(response, 'data'), 'data');

        dispatch({
            payload: transaction,
            type: CREATE_TRANSFER,
        });
    };

    const clearTransferStatus = () => {
        dispatch({
            type: RESET_CREATE_TRANSFER,
        });
    };

    /*
     * GET_ALL_STORE_PRODUCTS
     */
    const getStoreProducts = async (storeId) => {
        const response = await API.GET({
            url: `products/instore/${storeId}`,
        });

        let allStores = get(response.data, 'data');

        dispatch({
            payload: allStores[0],
            type: GET_ALL_STORE_PRODUCTS,
        });
    };

    /*
     * GET_ALL_NON_STORE_PRODUCTS
     */
    const getNonStoreProducts = async (storeId) => {
        const response = await API.GET({
            url: `products/nonstore/${storeId}`,
        });

        let allStores = get(response.data, 'data');

        dispatch({
            payload: allStores[0],
            type: GET_ALL_NON_STORE_PRODUCTS,
        });
    };
    /*
     * ADD_STORE_PRODUCT
     */
    const addStoreProduct = async (storeId, productId) => {
        await API.POST({
            url: `storeproducts/create/`,
            body: { storeId, productId },
        });

        await getStoreProducts(storeId);
        await getNonStoreProducts(storeId);
    };

    /*
     * REMOVE_STORE_PRODUCT
     */
    const deleteStoreProduct = async (storeId, productId) => {
        await API.POST({
            url: `storeproducts/delete/`,
            body: { storeId, productId },
        });

        await getStoreProducts(storeId);
        await getNonStoreProducts(storeId);
    };

    /*
     * GET_ALL_TWEET_DEALS
     */

    const getAllTweetDeals = async () => {
        const response = await API.GET({
            url: `deals/tweet/`,
        });

        const allTweet = get(get(response, 'data', {}), 'data', '');
        // console.log('allTweet', allTweet);
        dispatch({
            payload: allTweet,
            type: GET_ALL_TWEET_DEALS,
        });
        ///GET_ALL_TWEET_DEALS
    };

    return (
        <CartContext.Provider
            value={{
                fetchAllProducts,
                fetchProductsInCart,
                updateProductsInCart,
                getFilteredProducts,
                getProductById,
                removedFetchedState,
                deleteCartItemWithId,
                getUserCards,
                getUserAddresses,
                createTransfer,
                clearTransferStatus,
                decrementProductsInCart,
                updateCard,
                getStoreProducts,
                getNonStoreProducts,
                addStoreProduct,
                deleteStoreProduct,
                getAllTweetDeals,
                allProducts: state.allProducts,
                allProductsFetched: state.allProductsFetched,
                productsInCart: state.productsInCart,
                productsInCartFetched: state.productsInCartFetched,
                cartCount: state.cartCount,
                searchProducts: state.searchProducts,
                searchProductsFetched: state.searchProductsFetched,
                productById: state.productById,
                productByIdFetched: state.productByIdFetched,
                userCards: state.userCards,
                userCardsFetched: state.userCardsFetched,
                userAddresses: state.userAddresses,
                userAddressesFetched: state.userAddressesFetched,
                transferCreated: state.transferCreated,
                lastTransfer: state.lastTransfer,
                mba: state.mba,
                mbaFetched: state.mbaFetched,
                storeProducts: state.storeProducts,
                storeProductsFetched: state.storeProductsFetched,
                storeNotProducts: state.storeNotProducts,
                storeNotProductsFetched: state.storeNotProductsFetched,
                tweetDeals: state.tweetDeals,
                tweetDealsFetched: state.tweetDealsFetched,
            }}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartState;
