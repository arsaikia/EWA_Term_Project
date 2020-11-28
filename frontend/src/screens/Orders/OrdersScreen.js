import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { FormInput } from '../../components/Forms';
import { HeaderTwo, Description, HeaderThree } from '../../components/Texts';
import { Colors } from '../../components/Colors';
import ORDERS from '../../Images/orders.svg';
import Rating from '../../components/Rating';

import {
    Container,
    FlexContainer,
    Spacing,
    FadeInContainer,
} from '../../components/StylingComponents/index';

const Order = ({ ut, setShowReview }) => {
    console.log('ut', ut);
    return (
        <FlexContainer
            minHeight='100px'
            width='100%'
            boxShadow='2px 2px 3px 3px rgba(160,224,143, 1)'
            alignItems='center'
            backgroundColor='rgba(41,215,147, .40)'
            // border='solid 1px rgba(41,215,147, .60)'
            borderRadius='6px'
            padding='15px'
            flexDirection='column'>
            <FlexContainer
                width='100%'
                flexDirection='row'
                justifyContent='space-between'
                alignItems='space-between'>
                <FlexContainer width='60%'>
                    <HeaderTwo
                        text={<p>{ut.productName.substring(0, 10)}</p>}
                    />
                </FlexContainer>
                <FlexContainer width='20%'>
                    <Description text={<p>{`Qty: ${ut.quantity}`}</p>} />
                </FlexContainer>
                <FlexContainer width='20%'>
                    <Description text={<p>{`Price: ${ut.price}`}</p>} />
                </FlexContainer>
            </FlexContainer>
            <Spacing height='15px' />
            <FlexContainer
                width='100%'
                flexDirection='row'
                justifyContent='space-between'
                alignItems='space-between'>
                <FlexContainer width='60%'>
                    <Description
                        bold={700}
                        text={<p>{`Delivery By: ${ut.deliveryForcast}`}</p>}
                    />
                </FlexContainer>

                <FlexContainer width='20%'>
                    <Rating value={3.5} />
                </FlexContainer>
            </FlexContainer>
            <Spacing height='15px' />
            <FlexContainer
                width='100%'
                flexDirection='row'
                justifyContent='space-between'
                alignItems='space-between'
                paddingLeft='10px'
                paddingRight='10px'>
                <FlexContainer width='20%'>
                    <button type='button' class='btn btn-outline-danger sm'>
                        Cancel
                    </button>
                </FlexContainer>
                <FlexContainer width='20%'>
                    <button
                        type='button'
                        class='btn btn-outline-success sm'
                        onClick={() => setShowReview(true)}>
                        Review
                    </button>
                </FlexContainer>
            </FlexContainer>
        </FlexContainer>
    );
};

const OrdersScreen = ({ userTransactions, reviewSubmitHandler, ...props }) => {
    const [transactId, setTransactId] = useState('');

    const [showReview, setShowReview] = useState(false);
    const [text, setText] = useState('');
    const [rating, setRating] = useState(0);
    return (
        <>
            <FadeInContainer
                flexDirection='row'
                width='100vw'
                maxHeight='96vh'
                justifyContent='space-between'
                padding='3rem 50px 0rem 50px'
                overflow='hidden'
                onClick={() => null}
                style={{
                    backgroundImage: `url(${ORDERS})`,
                    backgroundPosition: 'right',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '60%',
                }}
                fadeIn
                duration={500}>
                <FlexContainer
                    flexDirection='column'
                    width='50%'
                    height='80vh'
                    overflow='hidden'>
                    <FlexContainer justifyContent='center' alignItems='center'>
                        <HeaderTwo
                            text={<p>All orders:</p>}
                            color={Colors.lightTextColor}
                        />
                    </FlexContainer>
                    <FlexContainer
                        width='100%'
                        maxHeight='90%'
                        flexDirection='column'
                        overflowY='scroll'
                        // justifyContent='center'
                        alignItems='center'
                        paddingTop='20px'>
                        {console.log('userTransactions', userTransactions)}
                        {userTransactions.length > 0 &&
                            userTransactions.map((ut, idx) => (
                                <FlexContainer
                                    onClick={() =>
                                        setTransactId(ut.transactionId)
                                    }
                                    width='60%'
                                    margin='20px 0px'
                                    backgroundColor='khaki'>
                                    <Order
                                        ut={ut}
                                        setShowReview={setShowReview}></Order>
                                </FlexContainer>
                            ))}
                    </FlexContainer>
                </FlexContainer>

                {showReview && (
                    <FlexContainer width='40%'>
                        <FlexContainer
                            width='50%'
                            height='80%'
                            flexDirection='column'
                            justifyContent='center'
                            alignItems='center'>
                            <FormInput
                                cancellable={false}
                                error={false}
                                errorMessage={'Text Cannot be Empty'}
                                onChange={setText}
                                title={'Review Text'}
                                value={text}
                                handleBlur={null}
                                required
                            />
                            <Spacing height={'20px'} />
                            <FormInput
                                cancellable={false}
                                error={false}
                                errorMessage={'Review Rating'}
                                onChange={setRating}
                                title={'Review Rating'}
                                value={rating}
                                handleBlur={null}
                                required
                            />
                            <Spacing height={'20px'} />
                            <Spacing height={'20px'} />
                            <button
                                type='button'
                                class='btn btn-primary'
                                onClick={reviewSubmitHandler}>
                                Submit Review
                            </button>
                        </FlexContainer>
                    </FlexContainer>
                )}
            </FadeInContainer>
        </>
    );
};

export default OrdersScreen;
