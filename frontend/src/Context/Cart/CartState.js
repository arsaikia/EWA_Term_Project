import axios from 'axios';
import Cookie from 'js-cookie';
import { get, pick } from 'lodash';
import React, { useReducer } from 'react';
import { v4 as uuid } from 'uuid';

import FRUIT from '../../Images/products/fruit_orange.png';
import CAKE from '../../Images/products/food_cake.png';

import API from '../../utils/Query';
import {
    GET_ALL_PRODUCTS,
    GET_PRODUCTS_IN_CART,
    UPDATE_CART,
    FILTER_PRODUCTS,
    GET_PRODUCT_BY_ID,
    REMOVE_FETCHED_STATE,
    SET_CART_COUNT,
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
    const getFilteredProducts = async (searchKey) => {
        const response = await API.GET({
            url: `products/matches/${searchKey}`,
        });
        const products = get(get(response, 'data'), 'data') || [];
        
        console.log(`response Matching ${searchKey} :`, products);
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
                allProducts: state.allProducts,
                allProductsFetched: state.allProductsFetched,
                productsInCart: state.productsInCart,
                productsInCartFetched: state.productsInCartFetched,
                cartCount: state.cartCount,
                searchProducts: state.searchProducts,
                searchProductsFetched: state.searchProductsFetched,
                productById: state.productById,
                productByIdFetched: state.productByIdFetched,
            }}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartState;
