import axios from 'axios';
import Cookie from 'js-cookie';
import { get } from 'lodash';
import React, { useReducer } from 'react';
import { v4 as uuid } from 'uuid';

import FRUIT from '../../Images/products/fruit_orange.png';
import CAKE from '../../Images/products/food_cake.png';

import API from '../../utils/Query';
import { GET_ALL_PRODUCTS, GET_PRODUCTS_IN_CART, UPDATE_CART } from '../types';

import CartContext from './cartContext';
import CartReducer from './cartReducer';

const CartState = (props) => {
    const initialState = {
        allProducts: [],
        allProductsFetched: false,
        productsInCart: [],
        productsInCartFetched: false,
    };

    const [state, dispatch] = useReducer(CartReducer, initialState);

    /*
     *   Get All Products
     */

    const productId1 = uuid();
    const productId2 = uuid();
    const products = [
        {
            productId: productId1,
            productImage: CAKE,
            isVeg: false,
            discount: 15,
            productName: 'Chocolate Deloche',
            quantity: 5,
            price: 15.99,
        },
        {
            productId: productId2,
            productImage: FRUIT,
            isVeg: true,
            discount: 17.25,
            productName: 'Chocolate Deloche',
            quantity: 0,
            price: 12.5,
        },
        {
            productId: productId1,
            productImage: CAKE,
            isVeg: false,
            discount: 15,
            productName: 'Chocolate Deloche',
            quantity: 5,
            price: 15.99,
        },
        {
            productId: productId2,
            productImage: FRUIT,
            isVeg: true,
            discount: 17.25,
            productName: 'Chocolate Deloche',
            quantity: 0,
            price: 12.5,
        },
        {
            productId: productId1,
            productImage: CAKE,
            isVeg: false,
            discount: 15,
            productName: 'Chocolate Deloche',
            quantity: 5,
            price: 15.99,
        },
        {
            productId: productId2,
            productImage: FRUIT,
            isVeg: true,
            discount: 17.25,
            productName: 'Chocolate Deloche',
            quantity: 0,
            price: 12.5,
        },
        {
            productId: productId1,
            productImage: CAKE,
            isVeg: false,
            discount: 15,
            productName: 'Chocolate Deloche',
            quantity: 5,
            price: 15.99,
        },
        {
            productId: productId2,
            productImage: FRUIT,
            isVeg: true,
            discount: 17.25,
            productName: 'Chocolate Deloche',
            quantity: 0,
            price: 12.5,
        },
        {
            productId: productId2,
            productImage: FRUIT,
            isVeg: true,
            discount: 17.25,
            productName: 'Chocolate Deloche',
            quantity: 0,
            price: 12.5,
        },
    ];

    const fetchAllProducts = () => {
        dispatch({
            payload: products,
            type: GET_ALL_PRODUCTS,
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
                allProducts: state.allProducts,
                allProductsFetched: state.allProductsFetched,
                productsInCart: state.productsInCart,
                productsInCartFetched: state.productsInCartFetched,
            }}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartState;
