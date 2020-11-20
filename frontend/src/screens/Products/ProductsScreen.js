import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import Rating from '../../components/Rating';
import styled from 'styled-components';

import { Container as FluidContainer } from 'react-bootstrap';

import BuyButton from '../../components/BuyButton';

import CAKE from '../../Images/products/food_cake.png';
import FRUIT from '../../Images/products/blueberries.png';

import { Alert } from 'react-bootstrap';
import {
    Container,
    FlexContainer,
    Spacing,
    FadeInContainer,
} from '../../components/StylingComponents/index';
import {
    Note,
    Description,
    HeaderOne,
    HeaderTwo,
    HeaderThree,
    HeaderRegular,
    FinePrint,
} from '../../components/Texts';

const StyledImage = styled.img`
    width: ${(props) => props.width};

    @media (max-width: 1150px) {
        width: ${(props) => props.mobileWidth};
        height: ${(props) => props.mobileWidth};
    }
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

const LeftImageContainer = ({ image }) => (
    <FlexContainer
        backgroundColor='#ffff'
        justifyContent='center'
        alignItems='center'
        height='60vh'
        mobileHeight='50vh'
        padding='1em'
        position='relative'
        overflow='hidden'
        borderRadius='8px'
        boxShadow='inset 2px 2px 3px 3px #cdcdcd; 2px 2px 3px 3px #cdcdcd'>
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
    </FlexContainer>
);

const ProductDetails = ({
    discount = '15',
    productName = 'Organic Sweet Corn',
    inStock = true,
    productPrice = '100.12',
    priceAfterDiscount = '90.05',
    productRating = 3.5,
    totalRatings = 1250,
}) => {
    return (
        <FlexContainer
            flexDirection='column'
            height='60vh'
            mobileHeight='50vh'
            backgroundColor='#ffff'
            padding='6% 10% 6% 10%'>
            <FlexContainer alignItems='center'>
                <FlexContainer
                    alignItems='center'
                    justifyContent='center'
                    minWidth='3em'
                    padding='2px 10px'
                    height='80%'
                    backgroundColor='#c7f6b6'
                    borderRadius='5px'
                    pointer={'showPointer'}>
                    <Discount
                        color='#00ab08'
                        bold={700}
                        pointer={'showPointer'}>
                        {`${discount}% OFF`}
                    </Discount>
                </FlexContainer>
            </FlexContainer>
            <FlexContainer marginTop='2%'>
                <HeaderRegular text={<p>{productName}</p>} />
            </FlexContainer>
            <FlexContainer marginTop='2%'>
                <Rating value={productRating} text={totalRatings} />
            </FlexContainer>
            <FlexContainer marginTop='3%'>
                <Note
                    bold
                    text={
                        <p>
                            Quick Overview: expedita earum alias? Quidem maiores
                            illum quo doloribus
                        </p>
                    }
                />
                expedita earum alias? Quidem maiores illum quo doloribus
                deleniti explicabo libero corrupti excepturi iusto tempora
                soluta, laudantium a fugit, labore unde debitis illo vitae,
                animi cumque sed est et obcaecati placeat! Suscipit, vero
                consectetur labore laboriosam pariatur est sit vitae veritatis?
                Veritatis, corrupti. Corporis, qui sequi! Doloribus sequi maxime
                dignissimos voluptate ab id cumque mollitia voluptates sint!
            </FlexContainer>
            <FlexContainer
                // backgroundColor='khaki'
                flexDirection='row'
                marginTop='3%'
                alignItems='flex-end'>
                <FinePrint
                    lineThrough='line-through'
                    text={<p>{`$${productPrice}`}</p>}
                    color='red'
                />
                <Container width='20px' />
                <HeaderTwo
                    bold
                    color='#28a745'
                    text={<p>{`$${priceAfterDiscount}`}</p>}
                />
            </FlexContainer>

            <FlexContainer marginTop='3%'>
                <FinePrint
                    text={inStock ? 'In Stock' : 'Out of Stock'}
                    bold={600}
                    color={inStock ? '#828282' : '#e2231a'}
                    pointer={'showPointer'}
                />
            </FlexContainer>

            <FlexContainer marginTop='10%'>
                <BuyButton
                    fullLengthButton={true}
                    disabled={false}
                    showPointer={'pointer'}
                    itemsInBag={0}
                    ContainsInCart={false}
                    quantity={2}
                />
            </FlexContainer>
        </FlexContainer>
    );
};

const RelatedProducts = () => {
    return (
        <FlexContainer
            backgroundColor='#ccd6f6'
            height='15vh'
            justifyContent='center'
            alignItems='center'>
            <HeaderOne
                text={<p>Market Basket Analysis to show Related Products</p>}
            />
        </FlexContainer>
    );
};

const ProductDescription = () => {
    return (
        <FlexContainer
            backgroundColor='khaki'
            justifyContent='center'
            alignItems='center'
            minHeight='1500px'></FlexContainer>
    );
};

const ProductsScreen = ({
    product = {
        productId: 'productId2',
        image: CAKE,
        isVeg: true,
        discount: 17.25,
        name: 'Chocolate Deloche',
        countInStock: 2,
        price: 12.5,
        rating: 4.5,
    },
}) => (
    <FluidContainer lg fluid>
        <FadeInContainer
            minHeight='100vh'
            margin='6em 8em 1em 8em'
            // backgroundColor='khaki'
            fadeIn
            duration={'300'}>
            <FluidContainer lg fluid>
                <Row>
                    <Col>
                        <LeftImageContainer image={FRUIT} />
                    </Col>
                    <Col>
                        <ProductDetails />
                    </Col>
                </Row>
                <FlexContainer height='50px' />
                <Row>
                    <Col>
                        <RelatedProducts></RelatedProducts>
                    </Col>
                </Row>
                <FlexContainer height='50px' />
                <Row>
                    <Col>
                        <ProductDescription></ProductDescription>
                    </Col>
                </Row>
            </FluidContainer>
        </FadeInContainer>
    </FluidContainer>
);
export default ProductsScreen;
