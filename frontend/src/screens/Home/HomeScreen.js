import React, { Component, useState, useRef } from 'react';
import styled from 'styled-components/macro';
import { Row, Col } from 'react-bootstrap';
import { Description } from '../../components/Texts';
import Carousel from 'react-elastic-carousel';
import SHOW from '../../Images/Icons/show.svg';
import HIDE from '../../Images/Icons/hide.svg';
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

const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 1, itemsToScroll: 1 },
    { width: 768, itemsToShow: 1 },
    { width: 1200, itemsToShow: 1 },
];

const CaoruselHome = () => {
    const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 12, 123, 221];
    const itemsPerPage = 1;
    const carouselRef = useRef(null);
    let resetTimeout;
    const totalPages = Math.ceil(items.length / itemsPerPage);

    return (
        <Carousel
            ref={carouselRef}
            breakPoints={breakPoints}
            enableAutoPlay
            autoPlaySpeed={2000}
            onNextEnd={({ index }) => {
                clearTimeout(resetTimeout);
                if (index + 1 === totalPages) {
                    resetTimeout = setTimeout(() => {
                        carouselRef.current.goTo(0);
                    }, 1500); // same time
                }
            }}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 12, 123, 221].map(() => (
                <FlexContainer height='100%' width='100%'>
                    <FlexContainer width='100%' backgroundColor='khaki'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Eveniet nulla laborum doloribus numquam accusamus.
                        Iusto, vel! Architecto numquam omnis obcaecati, quod
                        beatae id nihil unde inventore adipisci velit?
                        Accusantium sint commodi, tempora quisquam sed numquam
                        praesentium autem expedita, consectetur vero itaque
                        reiciendis repellat! Quisquam perspiciatis omnis
                        suscipit sed sequi mollitia quam laborum nulla commodi
                        sapiente quia quidem, sint ipsum ipsam deserunt? Maxime
                        consequuntur voluptatum est velit optio atque quae
                        voluptas quo quia deleniti itaque accusantium, suscipit
                        odio ipsum distinctio quibusdam expedita natus dolorem
                        sint impedit? Laudantium magni consequatur architecto
                        officia ab, quidem corporis et velit voluptate
                        voluptates eligendi illo excepturi? deserunt? Maxime
                        consequuntur voluptatum est velit optio atque quae
                        voluptas quo quia deleniti itaque accusantium, suscipit
                        odio ipsum distinctio quibusdam expedita natus dolorem
                        sint impedit? Laudantium magni consequatur architecto
                        officia ab, quidem corporis et velit voluptate
                        voluptates eligendi illo excepturi? deserunt? Maxime
                        consequuntur voluptatum est velit optio atque quae
                        voluptas quo quia deleniti itaque accusantium, suscipit
                        odio ipsum distinctio quibusdam expedita natus dolorem
                        sint impedit? Laudantium magni consequatur architecto
                        officia ab, quidem corporis et velit voluptate
                        voluptates eligendi illo excepturi?deserunt? Maxime
                        consequuntur voluptatum est velit optio atque quae
                        voluptas quo quia deleniti itaque accusantium, suscipit
                        odio ipsum distinctio quibusdam expedita natus dolorem
                        sint impedit? Laudantium magni consequatur architecto
                        officia ab, quidem corporis et velit voluptate
                        voluptates eligendi illo excepturi?deserunt? Maxime
                        consequuntur voluptatum est velit optio atque quae
                        voluptas quo quia deleniti itaque accusantium, suscipit
                        odio ipsum distinctio quibusdam expedita natus dolorem
                        sint impedit? Laudantium magni consequatur architecto
                        officia ab, quidem corporis et velit voluptate
                        voluptates eligendi illo excepturi?
                    </FlexContainer>
                </FlexContainer>
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
                        <CaoruselHome />
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
