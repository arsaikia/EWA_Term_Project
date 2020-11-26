import axios from 'axios';
import Cookie from 'js-cookie';
import { get, isEmpty, pick } from 'lodash';
import React, { useReducer } from 'react';
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
    };

    const [state, dispatch] = useReducer(CartReducer, initialState);

    /*
     *   Get All Products
     */

    const fetchAllProducts = async () => {
        const response = await API.GET({ url: 'products' });
        const products = get(get(response, 'data'), 'data') || [];
        // console.log('From fetchAllProducts :', products);
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
        const product = get(get(response, 'data'), 'data')[0] || [];

        dispatch({
            payload: product,
            type: GET_PRODUCT_BY_ID,
        });
    };

    // FILTER_PRODUCTS
    const getFilteredProducts = async (searchKey, filterBy) => {
        if (!isEmpty(filterBy)) {
            if (filterBy === 'CATEGORY') {
                const produces = state.originalProducts.filter(
                    (product) => product.category === searchKey
                );

                dispatch({
                    payload: produces,
                    type: FILTER_PRODUCTS,
                });
            }

            return;
        }

        const response = await API.GET({
            url: `products/matches/${searchKey}`,
        });
        const products = get(get(response, 'data'), 'data') || [];

        dispatch({
            payload: products,
            type: FILTER_PRODUCTS,
        });
    };

    const fetchProductsInCart = async (userId) => {
        const response = await API.GET({ url: `carts/${userId}` });
        const cart = get(get(response, 'data'), 'data') || [];

        let qty = 0;
        cart.forEach((product) => (qty += product.quantity));
        console.log(userId);

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
        await fetchAllProducts();
        await fetchProductsInCart(userId);
    };

    const deleteCartItemWithId = async (cartId, userId) => {
        await API.DELETE({ url: `carts/${cartId}` });

        fetchProductsInCart(userId);
    };

    /*
     *GET_USER_CARDS
     */
    const getUserCards = async (id) => {
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

    const createTransfer = async (totalPrice, userId, addressId) => {
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
                deliveryMethod: 'HOME',
                userId: userId,
                addressId: addressId,
                storeId: null,
            },
        });

        dispatch({
            type: CREATE_TRANSFER,
        });

        const success = get(get(response, 'data'), 'success');
    };

    const clearTransferStatus = () => {
        dispatch({
            type: RESET_CREATE_TRANSFER,
        });
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
            }}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartState;
