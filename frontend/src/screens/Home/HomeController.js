import axios from 'axios';
import Cookie from 'js-cookie';
import { get, isEmpty } from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import HomeScreen from './HomeScreen';
import AppContext from '../../Context/AppContext/appContext';
import CartContext from '../../Context/Cart/cartContext';

const HomeController = ({ setShowDropdown, ...props }) => {
    const appContext = useContext(AppContext);
    const { showHeader, setShowHeader } = appContext;

    const cartContext = useContext(CartContext);
    const {
        fetchAllProducts,
        fetchProductsInCart,
        updateProductsInCart,
        allProducts,
        allProductsFetched,
        productsInCart,
        productsInCartFetched,
    } = cartContext;
    /*
     * On Browser Back
     */
    window.onpopstate = (e) => {};

    useEffect(() => {
        setShowHeader(true);

        fetchAllProducts();
        fetchProductsInCart();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <HomeScreen
                setShowDropdown={setShowDropdown}
                updateProductsInCart={updateProductsInCart}
                allProducts={allProducts}
                allProductsFetched={allProductsFetched}
                productsInCart={productsInCart}
                productsInCartFetched={productsInCartFetched}
            />
        </>
    );
};

export { HomeController };
