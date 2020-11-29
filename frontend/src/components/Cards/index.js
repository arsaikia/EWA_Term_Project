import React, { useState } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { get, isEmpty } from 'lodash';
import {
    Container,
    FlexContainer,
    Spacing,
} from '../../components/StylingComponents';
import {
    Description,
    HeaderOne,
    HeaderTwo,
    headerThree,
    Note,
    FinePrint,
} from '../../components/Texts';

import BuyButton from '../BuyButton';

import styled from 'styled-components/macro';

import VEG_ICON from '../../Images/Icons/icon_vegitarian.svg';
import NON_VEG_ICON from '../../Images/Icons/icon_nonvegitarian.png';

const OuterContainer = styled(Container)`
    box-shadow: 10px 5px 5px grey;
`;

const Discount = styled.div`
    font-family: roboto;
    font-style: normal;
    font-weight: ${(props) => (props.bold ? props.bold : 'normal')};
    font-size: 14px;
    line-height: 20px;
    color: ${(props) => props.color};
    cursor: ${(props) => (props.pointer !== 'cursor' ? 'pointer' : 'cursor')};

    @media (max-width: 768px) {
        font-size: 12px;
        line-height: 16px;
    }
`;

const CardHeader = styled(Discount)`
    font-size: 14px;
    line-height: 20px;
    width: 100%;
    text-align: center;
    align-self: center;

    @media (max-width: 768px) {
        font-size: 12px;
        line-height: 16px;
    }
`;

const ItemCard = ({
    productId,
    discount = 15,
    isVeg = true,
    productImage,
    productName = 'Fresh Oranges - California',
    quantity,
    price = 12.99,
    inCartItems,
    isAddedToCart,
    goToProductsPage,
    addProductToCart,
    reduceProductsInCart,
    getItemsInBag,
    ...props
}) => {
    const imageSrc =
        require(`../../Images/products/${productImage.toLowerCase()}`)
            .default || 'apple';
    const showPointer = quantity < 1 ? 'cursor' : 'pointer';
    const inStock = quantity > 0;

    return (
        <FlexContainer
            width='100%'
            maxHeight='100%'
            justifyContent='center'
            alignItems='center'
            alignSelf='center'>
            <FlexContainer
                width='15em'
                minHeight='22em'
                overflow='hidden'
                flexDirection='column'
                backgroundColor='white'
                borderRadius='3px'
                padding='1rem 1rem'
                pointer={showPointer}
                boxShadow='#cdcdcd 2px 3px 10px 0px, 1px 2px 3px #cdcdcd'>
                <FlexContainer
                    height='10%'
                    width='100%'
                    flexDirection='row'
                    justifyContent='space-between'
                    // backgroundColor='khaki'
                    alignItems='center'
                    pointer={showPointer}>
                    <FlexContainer
                        alignItems='center'
                        justifyContent='center'
                        minWidth='3em'
                        padding='2px 10px'
                        height='80%'
                        backgroundColor='#c7f6b6'
                        borderRadius='5px'
                        pointer={showPointer}>
                        <Discount
                            color='#00ab08'
                            bold={700}
                            pointer={showPointer}>
                            {`${discount}%`}
                        </Discount>
                    </FlexContainer>
                    {isVeg ? (
                        <img
                            src={VEG_ICON}
                            alt='...'
                            width='13%'
                            style={{ pointer: showPointer }}
                        />
                    ) : (
                        <img src={NON_VEG_ICON} alt='...' width='13%' />
                    )}
                </FlexContainer>

                <FlexContainer
                    flexDirection='column'
                    justifyContent='center'
                    width={'210px'}
                    height={'250px'}
                    overflow='hidden'
                    position='relative'
                    onClick={goToProductsPage(productId, inStock)}>
                    <img
                        src={imageSrc}
                        alt='...'
                        width='100%'
                        style={{ position: 'absolute' }}
                    />
                </FlexContainer>
                <FlexContainer
                    height={'30%'}
                    flexDirection='column'
                    justifyContent='center'
                    alignItems='center'
                    pointer={showPointer}>
                    <CardHeader
                        color='#31363c'
                        bold={700}
                        pointer={showPointer}>
                        {productName}
                    </CardHeader>
                    <FinePrint
                        text={inStock ? 'In Stock' : 'Out of Stock'}
                        bold={600}
                        color={inStock ? '#828282' : '#e2231a'}
                        pointer={showPointer}
                    />
                    <Container margin='0.5em'>
                        <Note
                            text={`$${price}`}
                            bold={600}
                            color='#0a192f'
                            pointer={showPointer}
                        />
                    </Container>

                    <BuyButton
                        disabled={!inStock}
                        showPointer={showPointer}
                        productId={productId}
                        itemsInBag={getItemsInBag(productId)}
                        quantity={quantity}
                        ContainsInCart={isAddedToCart}
                        addProductToCart={addProductToCart}
                        reduceProductsInCart={reduceProductsInCart}
                    />
                </FlexContainer>
            </FlexContainer>
        </FlexContainer>
    );
};

export { ItemCard };
