import React, { Component, useState } from 'react';
import styled from 'styled-components/macro';
import { Button } from 'react-bootstrap';
import {
    Container,
    FlexContainer,
    Spacing,
    FadeInContainer,
} from '../../components/StylingComponents/index';
import { Check } from '../../components/Icons';
import {
    FormInput,
    DateInput,
    FormPasswordInput,
} from '../../components/Forms';
import { isEmpty } from 'lodash';
import {
    HeaderOne,
    Description,
    HeaderTwo,
    Note,
    FinePrint,
} from '../../components/Texts';

const textColor = '#383838';
const lightTextColor = '#585656';
const lightOnDark = '#cbd2dd';

const ExpandingContainer = styled(Container)`
    cursor: pointer;
    flex-direction: column;
    width: 100%;
    position: relative;
    transition: height 500ms ease-in-out, 500ms background-color ease-in-out;
    -webkit-transition: height 500ms ease-in-out,
        500ms background-color ease-in-out;

    &:hover {
        height: 100%;
        background-color: #3f536d;
    }
`;

const SingleCard = styled(FlexContainer)`
    &:hover {
        opacity: 0.9;
    }
`;

const ExistingCard = ({
    cardId,
    cardName,
    cardNumber,
    cvv,
    expiryDate,
    userId,
    selectedCard,
    setSelectedCard,
}) => {
    return (
        <SingleCard
            onClick={() => setSelectedCard(cardId)}
            flexDirection='row'
            justifyContent='space-between'
            padding='10px'
            backgroundColor='rgb(176,184,211)'
            margin='2% 0% 2% 0%'
            borderRadius='4px'>
            <Note
                text={`${cardName} (**** ${cardNumber % 10000} )`}
                bold={600}
            />

            {selectedCard === cardId && <Check />}
        </SingleCard>
    );
};

const Payment = ({
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
    continueHandler,
    ...props
}) => {
    return (
        <FlexContainer
            flexDirection='column'
            width='100%'
            height='100%'
            justifyContent='space-between'>
            <ExpandingContainer
                width='100%'
                height='40px'
                overflow='hidden'
                padding='5px'
                borderRadius='8px'
                border='1px solid #35475e'>
                <FlexContainer
                    width='100%'
                    flexDirection='row'
                    justifyContent='center'
                    alignSelf='center'
                    alignItems='center'>
                    <Description
                        text={<p>Select an existing Card</p>}
                        color={lightOnDark}
                        pointer={'pointer'}
                    />
                </FlexContainer>
                <Spacing height='10px' />
                {userCards &&
                    userCards.length > 0 &&
                    userCards.map((card) => (
                        <ExistingCard
                            key={card.cardId}
                            cardId={card.cardId}
                            cardName={card.cardName}
                            cardNumber={card.cardNumber}
                            cvv={card.cvv}
                            expiryDate={card.expiryDate}
                            userId={card.userId}
                            selectedCard={selectedCard}
                            setSelectedCard={setSelectedCard}
                        />
                    ))}
            </ExpandingContainer>
            <Spacing height='50px' mobileHeight='30px' />
            <FlexContainer
                width='100%'
                height='80%'
                flexDirection='column'
                alignItems='center'
                borderRadius='8px'
                alignSelf='center'
                // backgroundColor={'#35475e'}
                padding={'1em'}>
                <HeaderTwo text={<p>Add a new Card</p>} color={lightOnDark} />
                <Spacing height='50px' mobileHeight='30px' />

                <FlexContainer
                    flexDirection={'column'}
                    width='100%'
                    height='100%'
                    justifyContent='space-between'>
                    <FormInput
                        cancellable={!isEmpty(nameOnCard)}
                        error={nameError}
                        errorMessage={'Name Cannot be Empty'}
                        onChange={setNameOnCard}
                        title={'Name on Card'}
                        value={nameOnCard}
                        handleBlur={() => setNameError(isEmpty(nameOnCard))}
                        required
                    />
                    <FormInput
                        cancellable={!isEmpty(cardNumber)}
                        error={numberErr}
                        onChange={setCardNumber}
                        title={'Card Number'}
                        value={cardNumber}
                        handleBlur={() => setNumberErr(isEmpty(cardNumber))}
                        required
                    />

                    <FlexContainer
                        width='100%'
                        justifyContent='space-between'
                        marginBottom='10px'>
                        <FlexContainer width='60%'>
                            <DateInput
                                cancellable={!isEmpty(expiry)}
                                error={expirtErr}
                                onChange={setExpiry}
                                title={'Expiry Date'}
                                value={expiry}
                                handleBlur={() => setExpiryErr(isEmpty(expiry))}
                                required></DateInput>
                        </FlexContainer>
                        <FlexContainer width='30%'>
                            <FormPasswordInput
                                cancellable={!isEmpty(cvv)}
                                error={cvvErr}
                                onChange={setCvv}
                                title={'cvv'}
                                value={cvv}
                                handleBlur={() => setCvvErr(isEmpty(cvv))}
                                required></FormPasswordInput>
                        </FlexContainer>
                    </FlexContainer>

                    <Button
                        variant='primary'
                        onClick={() => {
                            continueHandler(getButtonText('ADD_PAYMENT'));
                        }}>
                        {getButtonText('ADD_PAYMENT')}
                    </Button>
                </FlexContainer>
            </FlexContainer>
        </FlexContainer>
    );
};

const ExistingAddress = ({
    addressId,
    street1,
    city,
    zip,
    state,
    selectedAddress,
    setSelectedAddress,
}) => {
    return (
        <SingleCard
            onClick={() => setSelectedAddress(addressId)}
            flexDirection='row'
            justifyContent='space-between'
            padding='10px'
            backgroundColor='rgb(176,184,211)'
            margin='2% 0% 2% 0%'
            borderRadius='4px'>
            <Note text={`${street1}, ${city}`} bold={600} />

            {selectedAddress === addressId && <Check />}
        </SingleCard>
    );
};
const Address = ({
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
    continueHandler,
    ...props
}) => {
    return (
        <FlexContainer
            flexDirection='column'
            width='100%'
            height='100%'
            justifyContent='space-between'>
            <ExpandingContainer
                width='100%'
                height='40px'
                overflow='hidden'
                padding='5px'
                borderRadius='8px'
                border='1px solid #35475e'>
                <FlexContainer
                    width='100%'
                    flexDirection='row'
                    justifyContent='center'
                    alignSelf='center'
                    alignItems='center'>
                    <Description
                        text={<p>Select an existing Address</p>}
                        color={lightOnDark}
                        pointer={'pointer'}
                    />
                </FlexContainer>
                <Spacing height='10px' />
                {userAddresses &&
                    userAddresses.length > 0 &&
                    userAddresses.map((address) => (
                        <ExistingAddress
                            key={address.addressId}
                            addressId={address.addressId}
                            street1={address.street1}
                            city={address.city}
                            zip={address.zip}
                            state={address.state}
                            selectedAddress={selectedAddress}
                            setSelectedAddress={setSelectedAddress}
                        />
                    ))}
            </ExpandingContainer>
            <Spacing height='50px' mobileHeight='30px' />

            <FlexContainer
                width='100%'
                height='80%'
                flexDirection='column'
                alignItems='center'
                borderRadius='8px'
                alignSelf='center'
                // backgroundColor={'#35475e'}
                padding={'1em'}>
                <HeaderTwo
                    text={<p>Add new Delivery Address</p>}
                    color={lightOnDark}
                />
                <Spacing height='50px' mobileHeight='30px' />

                <FlexContainer
                    flexDirection={'column'}
                    width='100%'
                    height='100%'
                    justifyContent='space-between'>
                    <FormInput
                        cancellable={!isEmpty(street)}
                        error={null}
                        errorMessage={'Street Address'}
                        onChange={setStreet}
                        title={'Street Address'}
                        value={street}
                        handleBlur={() => setNameError(isEmpty(nameOnCard))}
                        required
                    />
                    <FormInput
                        cancellable={!isEmpty(city)}
                        error={null}
                        errorMessage={'Street Address'}
                        onChange={setCity}
                        title={'City'}
                        value={city}
                        handleBlur={() => setNameError(isEmpty(nameOnCard))}
                        required
                    />
                    <FlexContainer
                        width='100%'
                        justifyContent='space-between'
                        marginBottom='10px'>
                        <FlexContainer width='40%'>
                            <FormInput
                                cancellable={!isEmpty(zip)}
                                error={null}
                                errorMessage={'Street Address'}
                                onChange={setZip}
                                title={'Zip'}
                                value={zip}
                                handleBlur={() =>
                                    setNameError(isEmpty(nameOnCard))
                                }
                                required
                            />
                        </FlexContainer>
                        <FlexContainer width='40%'>
                            <FormInput
                                cancellable={!isEmpty(state)}
                                error={null}
                                errorMessage={'Street Address'}
                                onChange={setState}
                                title={'State'}
                                value={state}
                                handleBlur={() =>
                                    setNameError(isEmpty(nameOnCard))
                                }
                                required
                            />
                        </FlexContainer>
                    </FlexContainer>
                    <Button
                        variant='primary'
                        onClick={() => {
                            continueHandler(getButtonText('ADD_ADDRESS'));
                        }}>
                        {getButtonText('ADD_ADDRESS')}
                    </Button>
                </FlexContainer>
            </FlexContainer>
        </FlexContainer>
    );
};

const AddressAndCards = ({
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
    ...props
}) =>
    checkoutStep === 'ADD_PAYMENT' ? (
        <Payment
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
            continueHandler={continueHandler}
            props={props}
        />
    ) : (
        <Address
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
            // ..
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
            continueHandler={continueHandler}
            props={props}
        />
    );

export default AddressAndCards;
