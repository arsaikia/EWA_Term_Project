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
import { get } from 'js-cookie';

const Order = ({
    ut,
    setShowReview,
    setOrderIdForReview,
    setProductIdForReview,
    userReviews,
}) => {
    const delInProgress = ut.deliveryStatus === 'IN_PROGRESS';
    const delCanceled = ut.deliveryStatus === 'CANCELLED';
    const delComplete = ut.deliveryStatus === 'DELIVERED';
    const review =
        userReviews &&
        userReviews.length > 0 &&
        userReviews.filter((review) => ut.orderId === review.orderId);
    const reviewSelectionHandler = () => {
        setShowReview(true);
        setOrderIdForReview(ut.orderId);
        setProductIdForReview(ut.productId);
    };
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
                    {delInProgress && (
                        <Description
                            bold={700}
                            text={<p>{`Expected: ${ut.deliveryForcast}`}</p>}
                        />
                    )}
                    {delComplete && (
                        <Description
                            bold={700}
                            text={<p>{`Delivered: ${ut.deliveryActual}`}</p>}
                        />
                    )}
                    {delCanceled && (
                        <Description
                            bold={600}
                            color={Colors.errorRed}
                            text={<p>{`${ut.cancelReason}`}</p>}
                        />
                    )}
                </FlexContainer>

                {review && review.length > 0 && (
                    <FlexContainer width='20%'>
                        <Rating value={review[0].reviewRating} />
                    </FlexContainer>
                )}
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
                    {delInProgress && (
                        <button type='button' class='btn btn-outline-danger sm'>
                            Cancel
                        </button>
                    )}
                </FlexContainer>
                <FlexContainer width='20%'>
                    {!delCanceled && review && review.length <= 0 && (
                        <button
                            type='button'
                            class='btn btn-outline-success sm'
                            onClick={reviewSelectionHandler}>
                            Review
                        </button>
                    )}
                </FlexContainer>
            </FlexContainer>
        </FlexContainer>
    );
};

const ReviewContainer = ({
    text,
    setText,
    rating,
    setRating,
    reviewSubmitHandler,
    orderId,
    productId,
    setShowReview,
    reloadDataAfterReview,
}) => {
    const submitReviewForProduct = async () => {
        setShowReview(false);
        await reviewSubmitHandler(orderId, productId, rating, text);
        await reloadDataAfterReview();
        return;
    };
    return (
        <FadeInContainer
            width='40%'
            fadeIn
            duration={1500}
            alignItems='flex-start'
            paddingTop='10%'>
            <FlexContainer
                padding='10px'
                width='50%'
                height='40%'
                flexDirection='column'
                justifyContent='flex-start'
                alignItems='center'
                // border='1px solid grey'
                // borderRadius='6px'
                // backgroundColor='rgba(19,201,177,0.42)'
            >
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
                    onClick={submitReviewForProduct}>
                    Submit Review
                </button>
            </FlexContainer>
        </FadeInContainer>
    );
};

const OrdersScreen = ({
    userTransactions,
    reviewSubmitHandler,
    reloadDataAfterReview,
    userReviews,
    ...props
}) => {
    const [orderIdForReview, setOrderIdForReview] = useState('');
    const [productIdForReview, setProductIdForReview] = useState('');
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
                    overflow='hidden'
                    position='relative'>
                    <FlexContainer
                        position='absolute'
                        width='100%'
                        maxHeight='98%'
                        flexDirection='column'
                        overflowY='scroll'
                        alignItems='center'
                        paddingTop='20px'>
                        <FlexContainer
                            justifyContent='center'
                            alignItems='center'
                            marginBottom='10px'>
                            <HeaderTwo
                                text={<p>All orders:</p>}
                                color={Colors.lightTextColor}
                            />
                        </FlexContainer>
                        {userTransactions.length > 0 &&
                            userTransactions.map((ut, idx) => (
                                <FlexContainer
                                    width='60%'
                                    mobileWidth={'80%'}
                                    margin='20px 0px'
                                    backgroundColor='khaki'>
                                    <Order
                                        ut={ut}
                                        setShowReview={setShowReview}
                                        orderIdForReview={orderIdForReview}
                                        setOrderIdForReview={
                                            setOrderIdForReview
                                        }
                                        productIdForReview={productIdForReview}
                                        setProductIdForReview={
                                            setProductIdForReview
                                        }
                                        userReviews={userReviews}
                                    />
                                </FlexContainer>
                            ))}
                    </FlexContainer>
                </FlexContainer>

                {showReview && (
                    <ReviewContainer
                        text={text}
                        setText={setText}
                        rating={rating}
                        setRating={setRating}
                        reviewSubmitHandler={reviewSubmitHandler}
                        orderId={orderIdForReview}
                        productId={productIdForReview}
                        setShowReview={setShowReview}
                        reloadDataAfterReview={reloadDataAfterReview}
                    />
                )}
            </FadeInContainer>
        </>
    );
};

export default OrdersScreen;
