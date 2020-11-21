import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import Rating from '../../components/Rating';
import styled from 'styled-components/macro';

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
            <Container marginTop='3%' overflow='hidden'>
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
                Veritatis, corrupti. Corporis
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

const DescriptionAndReviews = ({ description, revews }) => {
    return (
        <FlexContainer
            backgroundColor='khaki'
            // justifyContent='center'
            // alignItems='center'
            padding='2%'
            minHeight='150px'>
            <FlexContainer flexDirection='column'>
                <HeaderTwo text={<p>Product Description</p>} />
                <Description text={<p>{description}</p>} />
                <Spacing space='80px' mobileSpace='80px' />
                <Container height='2px' width='100%' backgroundColor='black' />
                <Spacing space='80px' mobileSpace='80px' />
                <HeaderTwo text={<p>Reviews:</p>} />
                <Spacing space='10px' mobileSpace='10px' />

                {reviews.map((review) => (
                    <FlexContainer flexDirection='column' key={review.id}>
                        <Rating
                            value={review.rating}
                            reviewerName={review.reviewerName}
                        />
                        <Description text={<p>{review.text}</p>} />
                        <Spacing space='30px' mobileSpace='30px' />
                    </FlexContainer>
                ))}
            </FlexContainer>
        </FlexContainer>
    );
};

const description =
    'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi quaerat eum dignissimos maxime, recusandae asperiores! Nobis beatae similique pariatur tenetur quae minima? Libero nam labore eaque? Saepe vitae labore obcaecati cumque aliquam nemo nam exercitationem atque aut deleniti, quibusdam repudiandae sapiente dolorum, modi magni excepturi, impedit et omnis unde recusandae id laborum? Quo obcaecati molestias consequuntur quam possimus velit dolore, blanditiis dolorum pariatur voluptatibus eligendi tempora reiciendis earum veniam, a facilis quibusdam quidem incidunt tenetur placeat excepturi, cum consectetur. Modi, vel. Voluptatum, iste veritatis facilis perferendis deleniti ducimus, temporibus beatae accusantium optio sint aperiam, esse dolorem commodi voluptatem delectus! Quas laboriosam mollitia excepturi quaerat, minima ea, incidunt laborum dolorem assumenda corporis amet laudantium recusandae quod? Voluptas, quia. Veritatis quod nulla mollitia, esse dicta quibusdam enim quas exercitationem quia ex. Impedit inventore temporibus incidunt iusto, reiciendis, dicta rerum velit ea omnis ad, magnam quod aperiam aspernatur possimus ullam officia eveniet magni explicabo exercitationem doloribus dolores! Quia saepe, esse odit temporibus veniam praesentium cumque quo recusandae quam sit nostrum ducimus rem sunt, omnis ad. Sequi iure magni, animi asperiores necessitatibus delectus reprehenderit. Consequuntur unde ipsam enim ullam voluptatem hic, autem omnis molestiae! Ex quas eos illum minima excepturi expedita soluta inventore modi!';

const reviews = [
    {
        id: 1,
        reviewerName: 'Arunabh saikia',
        text:
            'amet consectetur adipisicing elit. Eligendi quaerat eum dignissimos maxime, recusandae asperiores!amconsectetur adipisicing elit. Eligendi quaerat eum dignissimos maxime, recusandae asperiores!ameet consectetur adipisicing elit. Eligendi quaerat eum dignissimos maxime, recusandae asperiores!amet consectetur adipisicing elit. Eligendi quaerat eum dignissimos maxime, recusandae asperiores!amet consectetur adipisicing elit. Eligendi quaerat eum dignissimos maxime, recusandae asperiores!amet consectetur adipisicing elit. Eligendi quaerat eum dignissimos maxime, recusandae asperiores!amet consectetur adipisicing elit. Eligendi quaerat eum dignissimos maxime, recusandae asperiores!',
        rating: 3.5,
    },
    {
        id: 2,
        reviewerName: 'John Smith',
        text:
            'amet consectetur adipisicing elit. Eligendi quaerat consectetur adipisicing elit. Eligendi quaerat eum dignissimos maxime, recusandae asperiores!ame eum dignissimos maxime, recusandae consectetur adipisicing elit. Eligendi quaerat eum dignissimos maxime, recusandae asperiores!ame asperiores!',
        rating: 4,
    },
    {
        id: 3,
        reviewerName: 'Jane Smith',
        text:
            'amet consectetur adipisicing elit. Eligendi quaerat eum dignissimos maxime, consectetur adipisicing elit. Eligendi quaerat eum dignissimos maxime, recusandae asperiores!ame consectetur adipisicing elit. Eligendi quaerat eum dignissimos maxime, recusandae asperiores!ame recusandae asperiores!',
        rating: 3,
    },
];

const ProductsScreen = ({ productById }) => {
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
            <OuterContainer
                minHeight='100vh'
                margin='6em 8em 1em 8em'
                // backgroundColor='khaki'
                fadeIn
                duration={'300'}>
                <FluidContainer md fluid>
                    <FlexContainer>
                        <Row lg={2} xs={1}>
                            <Col>
                                <LeftImageContainer image={imageSrc} />
                            </Col>
                            <Col>
                                <ProductDetails
                                    discount={productById.discount}
                                    productName={productById.productName}
                                    inStock={productById.countInStock > 0}
                                    productPrice={productById.price}
                                    priceAfterDiscount={productPrice}
                                    productRating={productById.rating || 3.5}
                                    totalRatings={
                                        productById.totalRatings || 1210
                                    }
                                />
                            </Col>
                        </Row>
                    </FlexContainer>

                    <FlexContainer height='50px' />
                    <Row>
                        <Col>
                            <RelatedProducts></RelatedProducts>
                        </Col>
                    </Row>
                    <FlexContainer height='50px' />
                    <Row>
                        <Col>
                            <DescriptionAndReviews
                                description={productById.description}
                                reviews={productById.reviews || reviews}
                            />
                        </Col>
                    </Row>
                </FluidContainer>
            </OuterContainer>
        </FluidContainer>
    );
};
export default ProductsScreen;
