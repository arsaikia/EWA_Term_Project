import React, { Component, useState, useRef } from 'react';
import styled from 'styled-components/macro';
import { Row, Col } from 'react-bootstrap';
import {
    Description,
    HeaderThree,
    Note,
    HeaderOne,
    HeaderTwo,
} from '../../components/Texts';
import Carousel from 'react-elastic-carousel';
import SHOW from '../../Images/Icons/show.svg';
import HIDE from '../../Images/Icons/hide.svg';
import {
    Container,
    FlexContainer,
    Spacing,
    FadeInContainer,
} from '../../components/StylingComponents/index';

import { isEmpty } from 'lodash';
import { Popup } from '../../components/Popup';

import GoogleMapStores from '../../components/GoogleMapStores';

import AnimatedHamburger from '../../components/AnimatedHamburger';

import { ItemCard } from '../../components/Cards';

import { LeftNav } from './LeftNav';

import { useHistory } from 'react-router-dom';

const StyledImage = styled.img`
    width: ${(props) => props.width};
    cursor: pointer;

    @media (max-width: 1150px) {
        width: ${(props) => props.mobileWidth};
        height: ${(props) => props.mobileWidth};
    }
`;

const GridFlexContainer = styled(FlexContainer)`
    @media screen and (max-width: 1000px) {
        justify-content: 'center';
        align-items: 'center';
    }
`;

const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 1, itemsToScroll: 1 },
    { width: 768, itemsToShow: 1 },
    { width: 1200, itemsToShow: 1 },
];

const SingleTweetDeal = ({
    productId,
    productName,
    tweet,
    imageSrc,
    goToProducts,
}) => {
    const image =
        require(`../../Images/products/${imageSrc.toLowerCase()}`).default ||
        'apple';

    const history = useHistory();

    return (
        <FlexContainer
            height='100%'
            width='100%'
            minHeight='150px'
            cursor='pointer'>
            <FlexContainer
                width='100%'
                backgroundColor='rgba(98,105,119, 0.20)'
                flexDirection='row'
                justifyContent='space-between'
                alignItems='center'
                borderRadius='4px'
                padding='20px'
                cursor='pointer'>
                <Container width='70%'>
                    <HeaderThree
                        text={<p>{tweet}</p>}
                        fontStyle={'italic'}
                        cursor='pointer'
                    />
                </Container>
                <FlexContainer
                    width='140px'
                    // backgroundColor='white'
                    cursor='pointer'
                    height='140px'
                    alignItems='center'
                    justifyContent='center'
                    borderRadius='75px'
                    overflow='hidden'
                    onClick={() => {
                        // console.log('productId', productId);
                        goToProducts(productId);
                    }}>
                    <StyledImage
                        src={image}
                        alt='...'
                        responsive
                        height='100%'
                        mobileWidth='80%'
                        style={{
                            position: 'absolute',
                            overflow: 'hidden',
                        }}
                    />

                    {/* <Note text={productName} /> */}
                </FlexContainer>
                <FlexContainer
                    width='100px'
                    backgroundColor='khaki'
                    alignItems='center'
                    justifyContent='center'
                    borderRadius='15%'></FlexContainer>
            </FlexContainer>
        </FlexContainer>
    );
};

const CaoruselHome = ({ tweetDeals }) => {
    // console.log('tweetDeals', tweetDeals);

    const history = useHistory();
    const goToProducts = (pId) => {
        history.push(`/products/${pId}`);
    };

    const itemsPerPage = 1;
    const carouselRef = useRef(null);
    let resetTimeout;
    const totalPages = Math.ceil(tweetDeals.length / itemsPerPage);

    return (
        <Carousel
            ref={carouselRef}
            breakPoints={breakPoints}
            enableAutoPlay
            autoPlaySpeed={5000}
            onNextEnd={({ index }) => {
                clearTimeout(resetTimeout);
                if (index + 1 === totalPages) {
                    resetTimeout = setTimeout(() => {
                        !isEmpty(carouselRef) &&
                            !isEmpty(carouselRef.current) &&
                            carouselRef.current.goTo(0);
                    }, 1500); // same time
                }
            }}>
            {tweetDeals.length > 0 &&
                tweetDeals.map((tweet, idx) => (
                    <SingleTweetDeal
                        key={idx}
                        productId={tweet.productId}
                        productName={tweet.productName}
                        tweet={tweet.tweet}
                        imageSrc={tweet.image}
                        goToProducts={goToProducts}
                    />
                ))}
        </Carousel>
    );
};

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
    reduceProductsInCart,
    getItemsInBag,
    fetchAllProducts,
    getFilteredProducts,
    showMap,
    setShowMap,
    setStore,
    updateUserStore,
    defaultCoordinates,
    setDefaultCoordinates,
    selectedPark,
    setSelectedPark,
    tweetDeals,
    ...props
}) => {
    const [showPopup, setShowPopup] = useState(!false);
    const [showSidebar, setShowSidebar] = useState(false);
    const showSidebarHandler = () => {
        setShowSidebar(true);
    };

    if (showMap) {
        return (
            <GoogleMapStores
                setStore={setStore}
                setShowMap={setShowMap}
                fetchAllProducts={fetchAllProducts}
                updateUserStore={updateUserStore}
                defaultCoordinates={defaultCoordinates}
                setDefaultCoordinates={setDefaultCoordinates}
                selectedPark={selectedPark}
                setSelectedPark={setSelectedPark}
            />
        );
    }

    return (
        <>
            <FadeInContainer
                flexDirection='row'
                width='100%'
                height='100%'
                padding='1rem 10px 0rem 10px'
                onClick={() => setShowDropdown(false)}
                fadeIn
                duration={500}
                // overflow='scroll'
            >
                <FlexContainer
                    width='100%'
                    flexDirection='column'
                    height='100%'
                    // overflow='scroll'
                >
                    <FlexContainer height='50%' mobileHeight='30%' margin='1%'>
                        <CaoruselHome tweetDeals={tweetDeals} />
                    </FlexContainer>

                    <Container
                        pointer='pointer'
                        onClick={() => setShowSidebar(!showSidebar)}
                        position='sticky'
                        width='10px'
                        height='10px'
                        zIndex='101010'>
                        <img
                            src={showSidebar ? HIDE : SHOW}
                            alt={'Update..'}
                            height={20}
                        />
                    </Container>
                    <FlexContainer
                        flexDirection='row'
                        width='100%'
                        height='100'
                        justifyContent={
                            showSidebar ? 'space-between' : 'flex-end'
                        }
                        onClick={() => setShowDropdown(false)}>
                        <LeftNav
                            showSidebar={showSidebar}
                            showSidebarHandler={showSidebarHandler}
                            getFilteredProducts={getFilteredProducts}
                        />

                        <GridFlexContainer
                            minWidth={showSidebar ? '70%' : '100%'}
                            display='flex'
                            flexDirection='row'
                            flexWrap='wrap'
                            justifyContent='space-between'
                            alignItems='center'
                            heigh='100%'
                            // overflow='scroll'
                        >
                            {allProducts.map((product) => {
                                return (
                                    <FlexContainer
                                        margin='1.5%'
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
                                            reduceProductsInCart={
                                                reduceProductsInCart
                                            }
                                            getItemsInBag={getItemsInBag}
                                            {...props}
                                        />
                                    </FlexContainer>
                                );
                            })}
                        </GridFlexContainer>
                    </FlexContainer>
                </FlexContainer>
            </FadeInContainer>
        </>
    );
};

export default HomeScreen;
