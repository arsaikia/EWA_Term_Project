import React, { useState, useEffect } from 'react';
import { FormDropdown, FormInput } from '../../components/Forms';
import CUSTOMER from '../../Images/customer.svg';
import ADDRESS from '../../Images/addresses.svg';
import CARDS from '../../Images/cards.svg';
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
    const [email, setEmail] = useState(
        get(loggedInUser, 'email', 'arsaikia@gmail.com')
    );
    const [fname, setFname] = useState(
        get(loggedInUser, 'firstName', 'Arunabh')
    );
    const [lname, setLname] = useState(get(loggedInUser, 'lastName', 'Saikia'));
    let foodPrefX = get(loggedInUser, 'foodPreference', 'ALL');
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

const PaymentDetails = () => {
    const [cardId, setCardId] = useState(0);
    return (
        <FlexContainer
            width='100%'
            overflow='scroll'
            flexDirection='column'
            alignItems='center'>
            {[1, 2, 3, 4, 5, 6].map((card, idx) => (
                <FlexContainer
                    flexDirection='row'
                    margin='5% 0% 5% 0%'
                    onClick={() => setCardId(idx === cardId ? -1 : idx)}>
                    <PaymentCard
                        bank='itau'
                        type='black'
                        brand='mastercard'
                        number='4111111111111111'
                        cvv='202'
                        holderName='Owen Lars'
                        expiration='12/20'
                        flipped={false}
                    />
                    {idx === cardId && (
                        <FlexContainer
                            width='300px'
                            height='100%'
                            backgroundColor='khaki'
                        />
                    )}
                </FlexContainer>
            ))}
        </FlexContainer>
    );
};

const CustomerScreen = ({
    userType,
    isUserAuthenticated,
    loggedInUser,
    updateUser,
}) => {
    const [selectedOption, setSelectedOption] = useState(1);

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

                {selectedOption === 3 && <PaymentDetails />}

                {/* The Inforrmation Container */}
            </FlexContainer>
        </FadeInContainer>
    );
};

export default CustomerScreen;
