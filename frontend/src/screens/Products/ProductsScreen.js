import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { get } from 'lodash';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import Rating from '../../components/Rating';
import styled from 'styled-components/macro';
import { Popup } from '../../components/Popup';
import API from '../../utils/Query';

import { Container as FluidContainer } from 'react-bootstrap';

import BuyButton from '../../components/BuyButton';

import SHARE from '../../Images/Icons/share.svg';

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

const OuterContainer = styled(FadeInContainer)`
    margin: 6em 8em 1em 8em;

    @media (max-width: 768px) {
        margin: 120px 10px 1px 1px;
        flex-direction: row;
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
    productId,
    quantity,
    discount = '15',
    productName = 'Organic Sweet Corn',
    inStock = true,
    productPrice = '100.12',
    priceAfterDiscount = '90.05',
    productRating = 3.5,
    totalRatings = 1250,
    showShare,
    setShowShare,
    getItemsInBag,
    isAddedToCart,
    addProductToCart,
    reduceProductsInCart,
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
                <FlexContainer
                    marginLeft={'20px'}
                    pointer='pointer'
                    onClick={() => setShowShare(!showShare)}>
                    <img src={SHARE} alt='...' width='20px' />
                </FlexContainer>
            </FlexContainer>
            <FlexContainer marginTop='2%'>
                <HeaderRegular text={<p>{productName}</p>} />
            </FlexContainer>
            <FlexContainer marginTop='2%'>
                <Rating value={productRating} text={totalRatings} />
            </FlexContainer>
            <Container marginTop='3%' overflow='hidden' width='100%'>
                <Note
                    bold
                    text={
                        <p>
                            Quick Overview: Freshest food on all seasons
                            throughout the year right at you doorsteps.
                        </p>
                    }
                />
                Each product we feature has been independently selected and
                reviewed by our editorial team.<br></br>Save time and money
                every day with Eat Fresh! Eat Fresh organizes shopping lists,
                suggests great recipe ideas and helps save with grocery coupons.
                Each product we feature has been independently selected and
                reviewed by our editorial team.
                <br></br>
                <br></br>
                Each product we feature has been independently selected and
                reviewed by our editorial team.
            </Container>
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
                    productId={productId}
                    fullLengthButton={true}
                    disabled={quantity <= 0}
                    showPointer={quantity && 'pointer'}
                    itemsInBag={getItemsInBag(productId)}
                    ContainsInCart={isAddedToCart(productId)}
                    quantity={quantity}
                    addProductToCart={addProductToCart}
                    reduceProductsInCart={reduceProductsInCart}
                />
            </FlexContainer>
        </FlexContainer>
    );
};

const ProductDescription = ({ description }) => {
    return (
        <FlexContainer
            flexDirection='column'
            backgroundColor='#ccd6f6'
            padding='30px'
            minHeight='15vh'
            borderRadius='6px'
            // justifyContent='center'
            alignItems='center'>
            <HeaderTwo text={<p>Product Description</p>} />
            <Spacing space='20px' mobileSpace='20px' />
            <Description text={<p>{description}</p>} />
        </FlexContainer>
    );
};

const Reviews = ({ reviews }) => {
    const noReview = reviews.length <= 0;
    return (
        <FlexContainer padding='2%' minHeight='150px'>
            <FlexContainer flexDirection='column'>
                <Spacing space='80px' mobileSpace='80px' />
                <Container height='2px' width='100%' backgroundColor='black' />
                <Spacing space='80px' mobileSpace='80px' />
                <HeaderTwo
                    text={
                        <p>{noReview ? 'No reviews available!' : `Reviews:`}</p>
                    }
                />
                <Spacing space='10px' mobileSpace='10px' />

                {reviews.map((review) => (
                    <FlexContainer flexDirection='column' key={review._id}>
                        <Rating
                            value={review.reviewRating}
                            reviewerName={review.userName}
                        />
                        <Description text={<p>{review.reviewText}</p>} />
                        <Spacing space='30px' mobileSpace='30px' />
                    </FlexContainer>
                ))}
            </FlexContainer>
        </FlexContainer>
    );
};

const ShareProduct = ({ showShare, setShowShare, userId, productId }) => {
    const [email, setEmail] = useState('');
    const [shareDone, setShareDone] = useState(false);

    useEffect(() => {
        showShare && setShareDone(false);
    }, [showShare]);

    /*
     *SHARE_PRODUCT
     */
    const shareHandler = async () => {
        setShareDone(true);

        if (!userId || !productId) return;
        return await API.POST({
            url: `shares/`,
            body: {
                email,
                userId,
                productId,
            },
        });
    };

    return (
        <Popup
            popupWidth={'120vw'}
            popupHeight={'150vh'}
            showPopup={showShare}
            handlePopup={setShowShare}
            content={
                <Container>
                    {!shareDone ? (
                        <>
                            <label>
                                Please enter your friend's email id to share the
                                product:
                            </label>
                            <input
                                type='email'
                                className='form-control'
                                placeholder='emaill@address.com'
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Spacing space='20px' mobileSpace='10px' />
                            <button
                                color='#ffff'
                                type='submit'
                                className='btn btn-success btn-lg btn-block'
                                onClick={shareHandler}>
                                Share
                            </button>
                        </>
                    ) : (
                        <p>{`Product Successfully shared to ${email}. Click anywhere to close the window.`}</p>
                    )}
                </Container>
            }
        />
    );
};

const ProductsScreen = ({
    productById,
    showShare,
    setShowShare,
    userId,
    totalReview,
    getItemsInBag,
    isAddedToCart,
    addProductToCart,
    reduceProductsInCart,
}) => {
    const imageSrc =
        require(`../../Images/products/${productById.image.toLowerCase()}`)
            .default || 'apple';

    const productPrice =
        Math.round(
            (productById.price * (1 - productById.discount / 100) +
                Number.EPSILON) *
                100
        ) / 100;

    return (
        <FluidContainer sm fluid>
            <ShareProduct
                showShare={showShare}
                setShowShare={setShowShare}
                productId={productById.productId}
                userId={userId}
            />
            <OuterContainer
                minHeight='100vh'
                margin='6em 8em 1em 8em'
                fadeIn
                duration={'300'}>
                <FluidContainer md fluid>
                    <FlexContainer>
                        <Row lg={2} xs={1}>
                            <Col>
                                <LeftImageContainer image={imageSrc} />
                            </Col>
                            <Col>
                                {console.log('productById', productById)}
                                <ProductDetails
                                    productId={productById.productId}
                                    quantity={productById.countInStock}
                                    discount={productById.discount}
                                    productName={productById.productName}
                                    inStock={productById.countInStock > 0}
                                    productPrice={productById.price}
                                    priceAfterDiscount={productPrice}
                                    productRating={totalReview.rating}
                                    totalRatings={totalReview.count}
                                    showShare={showShare}
                                    setShowShare={setShowShare}
                                    getItemsInBag={getItemsInBag}
                                    isAddedToCart={isAddedToCart}
                                    addProductToCart={addProductToCart}
                                    reduceProductsInCart={reduceProductsInCart}
                                />
                            </Col>
                        </Row>
                    </FlexContainer>

                    <FlexContainer height='50px' />
                    <Row>
                        <Col>
                            <ProductDescription
                                description={productById.description}
                            />
                        </Col>
                    </Row>
                    <FlexContainer height='50px' />
                    <Row>
                        <Col>
                            <Reviews reviews={productById.reviews} />
                        </Col>
                    </Row>
                </FluidContainer>
            </OuterContainer>
        </FluidContainer>
    );
};
export default ProductsScreen;
