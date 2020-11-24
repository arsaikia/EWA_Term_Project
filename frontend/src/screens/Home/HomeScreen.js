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

import AnimatedHamburger from '../../components/AnimatedHamburger';

import { Popup } from '../../components/Popup/index';
import FRUIT from '../../Images/products/fruit_orange.png';
import CAKE from '../../Images/products/food_cake.png';

import Loader from '../../components/Loader';
import { v4 as uuid } from 'uuid';

import { ItemCard } from '../../components/Cards';

import { LeftNav } from './LeftNav';

const GridFlexContainer = styled(FlexContainer)`
    @media screen and (max-width: 1000px) {
        justify-content: 'center';
        align-items: 'center';
    }
`;

// const CollapsingContainer = styled(Container)`
//     cursor: pointer;
//     flex-direction: column;
//     width: 100%;
//     /* height: 100%; */
//     position: relative;
//     transition: display 500ms ease-in-out;
//     -webkit-transition: display 500ms ease-in-out;

//     &:hover {
//         display: none;
//     }
// `;

// const ExpandingContainer = styled(Container)`
//     cursor: pointer;
//     flex-direction: column;
//     height: 200px;
//     width: 100%;
//     position: relative;
//     transition: height 500ms ease-in-out, 500ms background-color ease-in-out;
//     -webkit-transition: height 500ms ease-in-out,
//         500ms background-color ease-in-out;

//     &:hover {
//         height: 100%;
//         background-color: #3f536d;
//     }
// `;

// const SideBar = styled(FadeInContainer)`
//     width: 30%;
//     min-width: 350px;
//     background-color: white;
//     /* background-color: rgba(10, 25, 47, 0.9); */
//     box-shadow: 2px 2px 10px 2px grey;
//     /* box-shadow: 0px 10px 40px rgb(10, 25, 47); */
//     border-radius: 8px;

//     @media screen and (max-width: 1010px) {
//         min-width: 300px;
//         min-width: 30%;
//     }
//     @media screen and (max-width: 768px) {
//         min-width: 150px;
//     }
// `;

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
    ...props
}) => {
    const [showSidebar, setShowSidebar] = useState(false);
    const showSidebarHandler = () => {
        setShowSidebar(true);
    };
    return (
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
    );
};

export default HomeScreen;
