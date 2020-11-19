import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
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
import styled from 'styled-components';

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
    cursor: ${(props) => (props.pointer ? 'pointer' : 'default')};

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

const BuyButton = () => {
    return (
        <FlexContainer
            width='50%'
            height='100%'
            justifyContent='center'
            alignItems='center'
            backgroundColor='#fc7233'
            borderRadius='30px'
            padding='5px'
            pointer
            style={{
                background: 'linear-gradient(to right,#f64f59,#fc7233)',
            }}>
            <FinePrint text={'Add to cart'} color='white' pointer />
        </FlexContainer>
    );
};

const ItemCard = ({
    discount = 15,
    isVeg = true,
    productImage,
    productName = 'Fresh Oranges - California',
}) => {
    return (
        <FlexContainer
            width='100%'
            maxHeight='100%'
            justifyContent='center'
            alignItems='center'
            alignSelf='center'
            pointer>
            <FlexContainer
                width='15em'
                minHeight='22em'
                overflow='hidden'
                flexDirection='column'
                backgroundColor='white'
                borderRadius='3px'
                padding='1rem 1rem'
                pointer
                boxShadow='2px 3px 5px #cdcdcd, 1px 2px 3px #cdcdcd'>
                <FlexContainer
                    height='10%'
                    width='100%'
                    flexDirection='row'
                    justifyContent='space-between'
                    // backgroundColor='khaki'
                    alignItems='center'
                    pointer>
                    <FlexContainer
                        alignItems='center'
                        justifyContent='center'
                        minWidth='3em'
                        padding='2px 10px'
                        height='80%'
                        backgroundColor='#c7f6b6'
                        borderRadius='5px'
                        pointer>
                        <Discount color='#00ab08' bold={700} pointer>
                            {`${discount}%`}
                        </Discount>
                    </FlexContainer>
                    {isVeg ? (
                        <img src={VEG_ICON} alt='...' width='13%' />
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
                    position='relative'>
                    <img
                        src={productImage}
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
                    pointer>
                    <CardHeader color='#31363c' bold={700} pointer>
                        {productName}
                    </CardHeader>
                    <FinePrint
                        text={'In Stock'}
                        bold={600}
                        color='#828282'
                        pointer
                    />
                    <Container margin='0.5em'>
                        <Note
                            text={'$13.99'}
                            bold={600}
                            color='#0a192f'
                            pointer
                        />
                    </Container>

                    <BuyButton />
                </FlexContainer>

                {/* <FlexContainer height={'10%'} backgroundColor='khaki'>
                        <Button>Continue</Button>
                </FlexContainer> */}
            </FlexContainer>
        </FlexContainer>
    );
};

export { ItemCard };
