import React, { Component, useState } from 'react';
import styled from 'styled-components/macro';
import { Row, Col } from 'react-bootstrap';
import { Description } from '../../components/Texts';
import {
    Container,
    FlexContainer,
    Spacing,
    FadeInContainer,
} from '../../components/StylingComponents/index';

import { Popup } from '../../components/Popup';

import GoogleMapStores from '../../components/GoogleMapStores';

import AnimatedHamburger from '../../components/AnimatedHamburger';

import { ItemCard } from '../../components/Cards';

import { LeftNav } from './LeftNav';

const GridFlexContainer = styled(FlexContainer)`
    @media screen and (max-width: 1000px) {
        justify-content: 'center';
        align-items: 'center';
    }
`;

const HomeScreen = ({
    setShowDropdown,
    updateProductsInCart,
    allProducts,
    allProductsFetched,
    productsInCart,
    productsInCartFetched,
    isAddedToCart,
    goToProductsPage,
    addProductToCart,
    getItemsInBag,
    getFilteredProducts,
    showMap,
    setShowMap,
    setStore,
    ...props
}) => {
    const [showPopup, setShowPopup] = useState(!false);
    const [showSidebar, setShowSidebar] = useState(false);
    const showSidebarHandler = () => {
        setShowSidebar(true);
    };

    if (showMap) {
        return <GoogleMapStores setStore={setStore} setShowMap={setShowMap} getFilteredProducts={getFilteredProducts} />;
    }

    return (
        <>
            <FadeInContainer
                flexDirection='row'
                width='100%'
                minHeight='96vh'
                padding='6rem 2rem 0rem 2rem'
                onClick={() => setShowDropdown(false)}
                fadeIn
                duration={500}>
                <AnimatedHamburger
                    isMenuOpen={showSidebar}
                    setShowSidebar={setShowSidebar}
                />

                <FlexContainer
                    flexDirection='row'
                    width='100%'
                    height='100%'
                    justifyContent={showSidebar ? 'space-between' : 'flex-end'}
                    onClick={() => setShowDropdown(false)}>
                    {
                        <LeftNav
                            showSidebar={showSidebar}
                            showSidebarHandler={showSidebarHandler}
                            getFilteredProducts={getFilteredProducts}
                        />
                    }

                    <GridFlexContainer
                        minWidth={showSidebar ? '70%' : '100%'}
                        display='flex'
                        flexDirection='row'
                        flexWrap='wrap'
                        justifyContent='space-between'
                        alignItems='center'>
                        {allProducts.map((product) => {
                            return (
                                <FlexContainer
                                    margin='3%'
                                    key={product.productId}>
                                    <ItemCard
                                        productId={product.productId}
                                        productImage={product.image}
                                        isVeg={product.isVeg}
                                        discount={product.discount}
                                        productName={product.productName}
                                        quantity={product.countInStock}
                                        price={product.price}
                                        inCartItems={productsInCart}
                                        isAddedToCart={isAddedToCart(
                                            product.productId
                                        )}
                                        goToProductsPage={goToProductsPage}
                                        addProductToCart={addProductToCart}
                                        getItemsInBag={getItemsInBag}
                                        {...props}
                                    />
                                </FlexContainer>
                            );
                        })}
                    </GridFlexContainer>
                </FlexContainer>
            </FadeInContainer>
        </>
    );
};

export default HomeScreen;
