import React, { useState, useEffect } from 'react';
import { FormDropdown, FormInput } from '../../components/Forms';
import CUSTOMER from '../../Images/customer.svg';
import ADDRESS from '../../Images/addresses.svg';
import CARDS from '../../Images/cards.svg';
import TICK from '../../Images/Icons/tick.svg';
import { get, isEmpty } from 'lodash';
import { Button } from '../../components/Button';
import Cookie from 'js-cookie';
import ConfirmationPopup from './ConfirmationPopup';
import PaymentCard from 'react-payment-card-component';

import {
    HeaderOne,
    HeaderTwo,
    HeaderThree,
    Description,
} from '../../components/Texts';
import { Colors } from '../../components/Colors';
import {
    Container,
    FlexContainer,
    Spacing,
    FadeInContainer,
} from '../../components/StylingComponents/index';

const FoodPreferenceOptions = [
    { value: 'ALL', label: 'ALL' },
    { value: 'Vegitarian/Vegan', label: 'VEGAN' },
    { value: 'High Protien/ Meat heavy', label: 'MEAT' },
    { value: 'I eat only Healthy', label: 'HEALTHY' },
];

const AccountDetails = ({ loggedInUser, updateUser }) => {
    const [showPopup, setShowPopup] = useState(false);
    const currentUserId = Cookie.get('USER_ID');
    const [email, setEmail] = useState(get(loggedInUser, 'email', ''));
    const [fname, setFname] = useState(get(loggedInUser, 'firstName', ''));
    const [lname, setLname] = useState(get(loggedInUser, 'lastName', ''));
    let foodPrefX = get(loggedInUser, 'foodPreference', '');
    foodPrefX = FoodPreferenceOptions.filter(
        (pref) => pref.label === foodPrefX
    );
    const [foodPref, setFoodPref] = useState(foodPrefX[0] || 'ALL');

    const UpdateAccountInfoHandler = async () => {
        !isEmpty(fname) && Cookie.set('USER_NAME', fname);
        !isEmpty(foodPref) && Cookie.set('FOOD_PREFERENCE', foodPref.label);
        const prefX = foodPref.label;
        const body = {
            fname,
            lname,
            foodPreference: prefX,
        };
        Cookie.set('FOOD_PREFERENCE', prefX);
        await updateUser(currentUserId, body);
        setShowPopup(true);
    };

    return (
        <>
            <ConfirmationPopup
                show={showPopup}
                setShow={setShowPopup}
                text={'Account details updated successfully!'}
            />
            <FlexContainer
                padding='10% 0%'
                flexDirection='column'
                width='100%'
                height='100%'
                justifyContent='flex-start'
                alignItems='center'>
                <HeaderTwo
                    text={<p>Your Account Details</p>}
                    color={Colors.lightTextColor}
                />
                <Spacing height={'50px'} />
                <FlexContainer width='60%' flexDirection='column'>
                    <FormInput
                        textColor={Colors.lightTextColor}
                        cancellable={false}
                        error={false}
                        errorMessage={'Email Cannot be Empty'}
                        onChange={null}
                        title={'Email ID'}
                        value={email}
                        handleBlur={null}
                        required
                    />
                    <Spacing height={'20px'} />

                    <FormInput
                        textColor={Colors.lightTextColor}
                        cancellable={!isEmpty(fname)}
                        error={isEmpty(fname)}
                        errorMessage={'Name Cannot be Empty'}
                        onChange={setFname}
                        title={'First Name'}
                        value={fname}
                        handleBlur={null}
                        required
                    />
                    <Spacing height={'20px'} />

                    <FormInput
                        textColor={Colors.lightTextColor}
                        cancellable={!isEmpty(fname)}
                        error={false}
                        onChange={setLname}
                        title={'Last Name'}
                        value={lname}
                        handleBlur={null}
                    />
                    <Spacing height={'20px'} />

                    <FormDropdown
                        options={FoodPreferenceOptions}
                        textColor={Colors.lightTextColor}
                        cancellable={!isEmpty(foodPref)}
                        error={false}
                        onChange={setFoodPref}
                        title={'Food Preference'}
                        value={foodPref}
                        handleBlur={null}
                    />
                    <Spacing height={'50px'} />

                    <button
                        disabled={
                            isEmpty(email) ||
                            isEmpty(fname) ||
                            isEmpty(foodPref)
                        }
                        type='button'
                        class='btn btn-outline-primary btn-lg btn-block'
                        onClick={UpdateAccountInfoHandler}>
                        Update Information
                    </button>
                </FlexContainer>
            </FlexContainer>
        </>
    );
};

const PaymentDetails = ({
    cardIdForUpdate,
    dateField,
    card,
    cardId,
    setCardId,
    idx,
    updateCard,
    userId,
}) => {
    const [cardName, setCardName] = useState(card.cardName);
    const [cardNum, setCardNum] = useState(card.cardNumber.toString());
    const [expiry, setExpiry] = useState(dateField);
    const [cvv, setCvv] = useState(card.cvv);
    const [flipped, setflipped] = useState(false);

    const updatHandler = () => {
        setCardId(-1);
        setflipped(false);

        const body = {
            cardName,
            cardNumber: parseInt(cardNum),
            cvv: cvv,
        };
        updateCard(cardIdForUpdate, body, userId);
    };
    return (
        <FlexContainer flexDirection='row' margin='5% 0% 5% 0%'>
            <Container onClick={() => setCardId(idx === cardId ? -1 : idx)}>
                <PaymentCard
                    bank='itau'
                    type='black'
                    brand='mastercard'
                    number={cardNum}
                    cvv={cvv}
                    holderName={cardName}
                    expiration={dateField}
                    flipped={flipped && idx === cardId}
                />
            </Container>
            {idx === cardId && (
                <FlexContainer
                    flexDirection='column'
                    padding='10px 20px'
                    width='400px'
                    height='100%'
                    // backgroundColor='rgba(41,215,147,0.4)'
                    borderRadius='10px'>
                    <FormInput
                        textColor={Colors.lightTextColor}
                        // cancellable={!isEmpty(cardName)}
                        error={isEmpty(cardName)}
                        errorMessage={'Cannot be empty'}
                        onChange={setCardName}
                        title={'Name'}
                        value={cardName}
                        handleBlur={null}
                    />
                    <FormInput
                        textColor={Colors.lightTextColor}
                        // cancellable={!isEmpty(cardNum)}
                        error={isEmpty(cardNum)}
                        onChange={setCardNum}
                        title={'Number'}
                        value={cardNum}
                        handleBlur={null}
                    />
                    <FlexContainer justifyContent='space-between'>
                        <Container width='30%'>
                            <FormInput
                                textColor={Colors.lightTextColor}
                                // cancellable={'!isEmpty(fname)'}
                                error={isEmpty(expiry)}
                                errorMessage={'Cannot be empty'}
                                onChange={setExpiry}
                                title={'Expiry'}
                                value={expiry}
                                handleBlur={null}
                            />
                        </Container>
                        {!isEmpty(cardName) &&
                            !isEmpty(cardNum) &&
                            !isEmpty(expiry) &&
                            cvv && (
                                <FlexContainer
                                    width='10%'
                                    pointer='pointer'
                                    alignItems='flex-end'
                                    onClick={updatHandler}>
                                    <img
                                        src={TICK}
                                        alt={'Update..'}
                                        height={30}
                                    />
                                </FlexContainer>
                            )}
                        <Container width='30%'>
                            <FormInput
                                textColor={Colors.lightTextColor}
                                // cancellable={'!isEmpty(fname)'}
                                error={!cvv}
                                errorMessage={'Cannot be empty'}
                                onChange={setCvv}
                                title={'cvv'}
                                value={cvv}
                                handleBlur={null}
                                focusHandler={() => setflipped(true)}
                                handleBlur={() => setflipped(false)}
                            />
                        </Container>
                    </FlexContainer>
                </FlexContainer>
            )}
        </FlexContainer>
    );
};

const Address = ({ address }) => {
    console.log('address', address);
    return (
        <FlexContainer
            flexDirection='column'
            width='60%'
            border='1px solid grey'
            borderRadius='8px'
            margin='10px'
            padding='10px'>
            <FormInput
                textColor={Colors.lightTextColor}
                // cancellable={!isEmpty(cardName)}
                // error={isEmpty(cardName)}
                errorMessage={'Cannot be empty'}
                onChange={null}
                title={'Street Address'}
                value={address.street1}
                handleBlur={null}
            />
            <FormInput
                textColor={Colors.lightTextColor}
                // cancellable={!isEmpty(cardName)}
                // error={isEmpty(cardName)}
                errorMessage={'Cannot be empty'}
                onChange={null}
                title={'City'}
                value={address.city}
                handleBlur={null}
            />
            <FormInput
                textColor={Colors.lightTextColor}
                // cancellable={!isEmpty(cardName)}
                // error={isEmpty(cardName)}
                errorMessage={'Cannot be empty'}
                onChange={null}
                title={'Zip'}
                value={address.zip}
                handleBlur={null}
            />
            <FormInput
                textColor={Colors.lightTextColor}
                // cancellable={!isEmpty(cardName)}
                // error={isEmpty(cardName)}
                errorMessage={'Cannot be empty'}
                onChange={null}
                title={'State'}
                value={address.state}
                handleBlur={null}
            />
        </FlexContainer>
    );
};

const CustomerScreen = ({
    userType,
    isUserAuthenticated,
    loggedInUser,
    updateUser,
    userCards,
    updateCard,
    userAddresses,
}) => {
    const [selectedOption, setSelectedOption] = useState(1);

    const [cardId, setCardId] = useState(-1);

    return (
        <FadeInContainer
            flexDirection='row'
            width={'100%'}
            height={'80%'}
            padding='3rem 50px 0rem 50px'
            fadeIn
            duration={1200}
            style={{
                backgroundImage: `url(${
                    selectedOption === 1
                        ? CUSTOMER
                        : selectedOption === 2
                        ? ADDRESS
                        : CARDS
                })`,
                backgroundPosition: 'right',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '40%',
            }}>
            <FlexContainer
                width='50%'
                mobileWidth='80%'
                flexDirection='column'
                justifyContent='flex-start'
                alignItems='center'>
                <FlexContainer
                    width='100%'
                    justifyContent='center'
                    // backgroundColor='khaki'
                >
                    <Button
                        inverted={true}
                        type={'flexible'}
                        text={'Account Details'}
                        onClick={() => setSelectedOption(1)}
                    />
                    <Spacing width='5px' />
                    <Button
                        inverted={true}
                        type={'flexible'}
                        text={'Saved Addresses'}
                        onClick={() => setSelectedOption(2)}
                    />
                    <Spacing width='5px' />
                    <Button
                        inverted={true}
                        type={'flexible'}
                        text={'Saved Cards'}
                        onClick={() => setSelectedOption(3)}
                    />
                </FlexContainer>

                {/* The Inforrmation Container */}
                {selectedOption === 1 && (
                    <AccountDetails
                        loggedInUser={loggedInUser}
                        updateUser={updateUser}
                    />
                )}

                <FlexContainer
                    width='100%'
                    overflow='scroll'
                    flexDirection='column'
                    alignItems='center'
                    paddingTop='120px'>
                    {selectedOption === 2 &&
                        userAddresses.map((address) => {
                            return (
                                <>
                                    <Spacing
                                        height='150px'
                                        mobileHeight='30px'
                                    />
                                    <Address address={address} />
                                </>
                            );
                        })}
                </FlexContainer>

                {selectedOption === 3 && (
                    <FlexContainer
                        width='100%'
                        overflow='scroll'
                        flexDirection='column'
                        alignItems='center'>
                        {userCards &&
                            userCards.map((card, idx) => {
                                {
                                    console.log(card);
                                    let dateField = card.expiryDate.split('-');
                                    dateField =
                                        dateField[1] +
                                        '/' +
                                        dateField[0].substring(2, 4);

                                    return (
                                        <PaymentDetails
                                            idx={idx}
                                            cardIdForUpdate={card.cardId}
                                            userId={card.userId}
                                            cardId={cardId}
                                            setCardId={setCardId}
                                            card={card}
                                            dateField={dateField}
                                            updateCard={updateCard}
                                        />
                                    );
                                }
                            })}
                    </FlexContainer>
                )}

                {/* The Inforrmation Container */}
            </FlexContainer>
        </FadeInContainer>
    );
};

export default CustomerScreen;
