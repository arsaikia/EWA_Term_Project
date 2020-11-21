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
    GET_SEARCH_PRODUCTS,
    GET_PRODUCT_BY_ID,
    REMOVE_FETCHED_STATE,
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

    // GET_SEARCH_PRODUCTS
    const getSearchBarProducts = () => {
        const allowed = ['productId', 'productName'];
        const filtered = pick(state.allProducts, allowed);

        dispatch({
            type: GET_SEARCH_PRODUCTS,
        });
    };

    const fetchProductsInCart = () => {
        const inCartItems = [
            {
                //productId: productId1, count: 1
            },
        ];
        dispatch({
            payload: inCartItems,
            type: GET_PRODUCTS_IN_CART,
        });
    };

    const updateProductsInCart = (productId, count) => {
        dispatch({
            payload: { productId, count },
            type: UPDATE_CART,
        });
    };

    return (
        <CartContext.Provider
            value={{
                fetchAllProducts,
                fetchProductsInCart,
                updateProductsInCart,
                getSearchBarProducts,
                getProductById,
                removedFetchedState,
                allProducts: state.allProducts,
                allProductsFetched: state.allProductsFetched,
                productsInCart: state.productsInCart,
                productsInCartFetched: state.productsInCartFetched,
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
