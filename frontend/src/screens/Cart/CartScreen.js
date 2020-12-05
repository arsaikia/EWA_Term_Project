import React, { Component, useState } from 'react';
import styled from 'styled-components/macro';
import { Button } from 'react-bootstrap';
import { get } from 'lodash';
import {
    Container,
    FlexContainer,
    Spacing,
    FadeInContainer,
} from '../../components/StylingComponents/index';
import {
    FormInput,
    DateInput,
    FormPasswordInput,
} from '../../components/Forms';
import { Popup } from '../../components/Popup/index';
import EMPTY_CART from '../../Images/Icons/empty_cart.svg';
import CROSS_ICON from '../../Images/Icons/crossIcon.svg';
import GO_BACK from '../../Images/Icons/goBack.svg';
import NoAuth from './NoAuth';
import {
    HeaderOne,
    Description,
    HeaderTwo,
    Note,
    HeaderThree,
    FinePrint,
} from '../../components/Texts';

import Carousel from 'react-elastic-carousel';

import AddressAndCards from './AddressAndCards';
import { isEmpty } from 'lodash';

const textColor = '#383838';
const lightTextColor = '#585656';
const lightOnDark = '#cbd2dd';

// const ExpandingContainer = styled(Container)`
//     cursor: 'pointer';
//     flex-direction: column;
//     width: 100%;
//     position: relative;
//     transition: height 500ms ease-in-out, 500ms background-color ease-in-out;
//     -webkit-transition: height 500ms ease-in-out,
//         500ms background-color ease-in-out;

//     &:hover {
//         cursor: 'pointer';
//         height: 100%;
//         background-color: #3f536d;
//     }
// `;

const GoHomeButton = ({ history }) => (
    <FlexContainer
        justifyContent='center'
        alignItems='center'
        height='80%'
        padding='6px'
        // backgroundColor='khaki'
        borderRadius='10px'
        opacity='0.85'
        // border='2px solid khaki'
        // boxShadow='8px 5px 5px 2px grey'
        pointer='pointer'
        onClick={() => {
            history.push('/home');
        }}>
        <img src={GO_BACK} alt={'back to home..'} height={20} />
        <Spacing width='15px' />
        <Note
            text={<p>Continue Shopping</p>}
            bold={600}
            color={lightTextColor}
        />
    </FlexContainer>
);
const ImageContainer = ({ PRODUCT_IMAGE }) => {
    return (
        <FlexContainer
            width='80px'
            height='80px'
            borderRadius='75px'
            overflow='hidden'
            border='1px solid grey'>
            <img src={PRODUCT_IMAGE} width={'100%'} alt='product....' />
        </FlexContainer>
    );
};

const RemoveProductFromCart = ({ deleteCartItem, cartId }) => {
    return (
        <FlexContainer onClick={deleteCartItem(cartId)} pointer='pointer'>
            <img src={CROSS_ICON} alt={'delete..'} height={20} />
        </FlexContainer>
    );
};

const CartProductItem = ({
    cartId,
    productName,
    image,
    quantity,
    countInStock,
    discount,
    productId,
    price,
    calculatePrice,
    deleteCartItem,
    ...props
}) => {
    const actualPrice = calculatePrice(price, discount);
    const imageSrc =
        require(`../../Images/products/${image.toLowerCase()}`).default ||
        'apple';

    return (
        <FlexContainer
            width='100%'
            height='5em'
            // backgroundColor='khaki'
            justifyContent='space-between'
            alignItems='center'>
            <FlexContainer
                width='40%'
                // backgroundColor='#66b032'
            >
                <FlexContainer
                    flexDirection='row'
                    width='100%'
                    height='100%'
                    // backgroundColor='lavender'
                    alignItems='center'>
                    <ImageContainer PRODUCT_IMAGE={imageSrc}></ImageContainer>
                    <Spacing width='30px' mobileWidth='20px' />
                    <FlexContainer flexDirection='column'>
                        <Description
                            text={<p>{productName}</p>}
                            color={textColor}
                            bold={700}
                        />
                        <FinePrint
                            text={<p>{`ID#${productId.slice(0, 8)}`}</p>}
                            color={lightTextColor}
                        />
                    </FlexContainer>
                </FlexContainer>
            </FlexContainer>
            <FlexContainer
                width='10%'
                // backgroundColor='#66b032'
                justifyContent='space-between'>
                {/* <p>-</p> */}
                <Container>
                    <HeaderThree
                        text={<p>{quantity}</p>}
                        color={lightTextColor}
                    />
                </Container>
                {/* <p>+</p> */}
            </FlexContainer>
            <FlexContainer width='15%'>
                <FlexContainer
                    flexDirection='row'
                    width='100%'
                    height='100%'
                    justifyContent='space-between'
                    alignItems='center'>
                    <Description
                        text={<p>{`$ ${actualPrice}`}</p>}
                        color={textColor}
                        bold={700}
                    />
                    <RemoveProductFromCart
                        cartId={cartId}
                        deleteCartItem={deleteCartItem}
                    />
                </FlexContainer>
            </FlexContainer>
        </FlexContainer>
    );
};

const Item = ({ productId, productName, price, image, addProductToCart }) => {
    const imageSrc =
        require(`../../Images/products/${image.toLowerCase()}`).default ||
        'apple';

    const addToCart = () => {
        return addProductToCart(productId);
    };
    return (
        <FlexContainer
            flexDirection='column'
            justifyContent='space-between'
            alignItems='center'
            alignSelf='center'
            height='100%'>
            <img src={imageSrc} height={'100px'} alt='product....' />

            <FlexContainer
                flexDirection='column'
                justifyContent='center'
                alignItems='center'>
                <p>{productName}</p>
                <p>{`$${price}`}</p>
                <FlexContainer onClick={addToCart}>
                    <Note
                        text={<p>Add</p>}
                        pointer='pointer'
                        bold={550}
                        color={lightTextColor}
                    />
                </FlexContainer>
            </FlexContainer>
        </FlexContainer>
    );
};

const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2, itemsToScroll: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
];

const MarketBasketAnalysis = ({ mba, calculatePrice, addProductToCart }) => {
    return (
        <FlexContainer
            height='30%'
            width='100%'
            overflow='hidden'
            justifyContent='center'
            alignItems='center'>
            {mba.length > 0 && (
                <Carousel
                    breakPoints={breakPoints}
                    enableAutoPlay
                    autoPlaySpeed={2000}>
                    {mba.map((product) => (
                        <Item
                            key={product.productId}
                            productId={product.productId}
                            image={product.image}
                            productName={product.productName}
                            price={calculatePrice(
                                product.price,
                                product.discount
                            )}
                            discount={product.discount}
                            addProductToCart={addProductToCart}
                        />
                    ))}
                </Carousel>
            )}
        </FlexContainer>
    );
};

const CartScreen = ({
    isAuthenticationAttempted,
    isUserSemiAuthenticated,
    authenticationError,
    history,
    productsInCart,
    mba,
    addProductToCart,
    productsInCartFetched,
    totalPrice,
    calculatePrice,
    deleteCartItem,
    userCards,
    setSelectedCard,
    selectedCard,
    nameOnCard,
    setNameOnCard,
    cardNumber,
    setCardNumber,
    expiry,
    setExpiry,
    cvv,
    setCvv,
    nameError,
    setNameError,
    numberErr,
    setNumberErr,
    expirtErr,
    setExpiryErr,
    cvvErr,
    setCvvErr,
    getButtonText,
    checkoutStep,
    setCheckoutStep,

    userAddresses,
    selectedAddress,
    setSelectedAddress,

    street,
    city,
    zip,
    state,

    setStreet,
    setCity,
    setZip,
    setState,
    continueHandler,

    allStores,

    selectedStore,
    setSelectedStore,
    ...props
}) => {
    if (isEmpty(productsInCart) || !isUserSemiAuthenticated)
        return (
            <NoAuth
                history={history}
                isUserSemiAuthenticated={isUserSemiAuthenticated}
                productsInCartEmpty={isEmpty(productsInCart)}
            />
        );

    return (
        <FadeInContainer
            flexDirection='row'
            width='100%'
            minHeight='100vh'
            padding='3rem 2rem 2rem 2rem'
            justifyContent='space-between'
            fadeIn
            duration={'500'}>
            <FlexContainer
                // backgroundColor='khaki'
                width='70%'
                flexDirection='column'
                minHeight='99vh'
                justifyContent='flex-start'
                padding='20px'>
                <HeaderOne
                    text={<p>Shopping Cart</p>}
                    bold={600}
                    color={textColor}
                />
                <Spacing space={'5%'} />

                <FlexContainer
                    height='60%'
                    width='100%'
                    flexDirection='column'
                    // backgroundColor='khaki'
                    overflow='scroll'
                    paddingBottom='20px'>
                    {/* This is One cart product */}

                    {productsInCart.map((product) => {
                        const currentProduct = get(product, 'product', {});
                        return (
                            <FadeInContainer
                                key={product.cartId}
                                fadeIn
                                duration={300}
                                flexDirection='column'>
                                <CartProductItem
                                    cartId={product.cartId}
                                    productName={currentProduct.productName}
                                    image={currentProduct.image}
                                    quantity={product.quantity}
                                    countInStock={currentProduct.countInStock}
                                    discount={currentProduct.discount}
                                    productId={currentProduct.productId}
                                    price={currentProduct.price}
                                    calculatePrice={calculatePrice}
                                    deleteCartItem={deleteCartItem}
                                    props={props}
                                />
                                <Spacing space={'20px'} mobileSpace='10px' />
                                <FlexContainer
                                    width='100%'
                                    height='3px'
                                    backgroundColor='#f0f0f0'
                                />
                                <Spacing space={'20px'} mobileSpace='10px' />
                            </FadeInContainer>
                        );
                    })}
                    {/* This is One cart product */}
                </FlexContainer>

                {/* This is Market basket recommendation */}
                <MarketBasketAnalysis
                    mba={mba}
                    calculatePrice={calculatePrice}
                    addProductToCart={addProductToCart}
                />

                <FlexContainer
                    height='8%'
                    // backgroundColor='grey'
                    flexDirection='row'
                    justifyContent='space-between'>
                    <GoHomeButton history={history} />
                    <FlexContainer>
                        <HeaderTwo
                            text={<p>Sub-total: </p>}
                            color={lightTextColor}
                        />
                        <Spacing width={'10px'} />
                        <HeaderTwo
                            text={<p>{`$${totalPrice}`}</p>}
                            color={textColor}
                        />
                    </FlexContainer>
                </FlexContainer>
            </FlexContainer>
            <FadeInContainer
                // backgroundColor='khaki'
                width='25%'
                height='90vh'
                padding='2em'
                backgroundColor='rgba(10,25,47,0.90)'
                boxShadow='0px 10px 40px rgb(10,25,47)'
                borderRadius='8px'
                flexDirection='column'
                fadeIn
                duration={'1500'}>
                <AddressAndCards
                    userCards={userCards}
                    setSelectedCard={setSelectedCard}
                    selectedCard={selectedCard}
                    nameOnCard={nameOnCard}
                    setNameOnCard={setNameOnCard}
                    cardNumber={cardNumber}
                    setCardNumber={setCardNumber}
                    expiry={expiry}
                    setExpiry={setExpiry}
                    cvv={cvv}
                    setCvv={setCvv}
                    nameError={nameError}
                    setNameError={setNameError}
                    numberErr={numberErr}
                    setNumberErr={setNameError}
                    expirtErr={expirtErr}
                    setExpiryErr={setExpiryErr}
                    cvvErr={cvvErr}
                    setCvvErr={setCvvErr}
                    getButtonText={getButtonText}
                    checkoutStep={checkoutStep}
                    setCheckoutStep={setCheckoutStep}
                    userAddresses={userAddresses}
                    selectedAddress={selectedAddress}
                    setSelectedAddress={setSelectedAddress}
                    street={street}
                    city={city}
                    zip={zip}
                    state={state}
                    setStreet={setStreet}
                    setCity={setCity}
                    setZip={setZip}
                    setState={setState}
                    continueHandler={continueHandler}
                    allStores={allStores}
                    selectedStore={selectedStore}
                    setSelectedStore={setSelectedStore}
                    props={props}
                />
            </FadeInContainer>
        </FadeInContainer>
    );
};

export default CartScreen;
