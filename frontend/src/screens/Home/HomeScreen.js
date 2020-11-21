import React, { Component, useState } from 'react';
import styled from 'styled-components/macro';
import { Row, Col } from 'react-bootstrap';
import {
    Container,
    FlexContainer,
    Spacing,
    FadeInContainer,
} from '../../components/StylingComponents/index';
import { Popup } from '../../components/Popup/index';
import FRUIT from '../../Images/products/fruit_orange.png';
import CAKE from '../../Images/products/food_cake.png';

import Loader from '../../components/Loader';
import { v4 as uuid } from 'uuid';

import { ItemCard } from '../../components/Cards';

const GridFlexContainer = styled(FlexContainer)`
    @media screen and (max-width: 1000px) {
        justify-content: 'center';
        align-items: 'center';
    }
`;
const SideBar = styled(FlexContainer)`
    @media screen and (max-width: 1000px) {
        min-width: 30%;
    }
    @media screen and (max-width: 768px) {
        min-width: 30%;
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
    ...props
}) => {
    return (
        <FadeInContainer
            flexDirection='row'
            width='100%'
            minHeight='96vh'
            padding='8rem 2rem 0rem 2rem'
            onClick={() => setShowDropdown(false)}
            fadeIn
            duration={500}>
            {/* <Popup
                showPopup={!allProductsFetched || !productsInCartFetched}
                handlePopup={() => console.log('Clicked on popup')}
                content={
                    <Container>
                        <label>Enter Zip Code:</label>
                        <input
                            type='email'
                            className='form-control'
                            placeholder='Enter your zipcode'
                            onChange={(e) => setZipCode(e.target.value)}
                        />
                        <Spacing space='20px' mobileSpace='10px' />
                        <button
                            color='#ffff'
                            type='submit'
                            className='btn btn-success btn-lg btn-block'
                            onClick={() => setShowPopup(false)}>
                            Use This Location
                        </button>
                    </Container>
                }
            /> */}

            <FlexContainer flexDirection='row' width='100%' height='100%'>
                <SideBar width='30%' border='solid 1px #282c34' />
                <GridFlexContainer
                    minWidth='70%'
                    display='flex'
                    flexDirection='row'
                    flexWrap='wrap'
                    justifyContent='space-between'
                    alignItems='center'>
                    {allProducts.map((product) => {
                        return (
                            <FlexContainer margin='3%' key={product.productId}>
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
                                    {...props}
                                />
                            </FlexContainer>
                        );
                    })}
                </GridFlexContainer>
            </FlexContainer>
        </FadeInContainer>
    );
};

export default HomeScreen;
