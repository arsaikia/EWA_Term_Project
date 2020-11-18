import React, { Component, useState } from 'react';
import styled from 'styled-components';
import {
    Container,
    FlexContainer,
    Spacing,
    FadeInContainer,
} from '../../components/StylingComponents/index';
import { Popup } from '../../components/Popup/index';
import Image from '../../Images/img1.png';

import Loader from '../../components/Loader';

const HomeScreen = ({
    showHeader,
    setEmail,
    setPassword,
    getUsersHandler,
    setShowDropdown,
}) => {
    const randArray = Array.from({ length: 40 }, () =>
        Math.floor(Math.random() * 40)
    );
    const [showPopup, setShowPopup] = useState(false);
    const [zipCode, setZipCode] = useState('60616');
    console.log('zipCode', zipCode);

    return (
        <Loader showLoader={false}>
            <FadeInContainer
                onClick={() => setShowDropdown(false)}
                maxWidth='100%'
                minHeight='100vh'
                fadeIn
                duration={'300'}>
                <Popup
                    showPopup={showPopup}
                    handlePopup={() => console.log('Clicked on popup')}
                    content={
                        <Container>
                            <label>Enter Zip Code:</label>
                            <input
                                type='email'
                                className='form-control'
                                placeholder='Enter your zipcode'
                                onChange={(e) => setZipCode(e.target.value)}
                            />
                            <Spacing space='20px' mobileSpace='10px' />
                            <button
                                color='#ffff'
                                type='submit'
                                className='btn btn-success btn-lg btn-block'
                                onClick={() => setShowPopup(false)}>
                                Use This Location
                            </button>
                        </Container>
                    }
                />
                <Spacing space='300px' />

                <FadeInContainer padding='8rem 3rem'>
                    <FlexContainer
                        width='85%'
                        marginLeft='auto'
                        flexDirection='row'
                        style={{ flexWrap: 'wrap' }}>
                        {randArray.map((el) => (
                            <FlexContainer
                                justifyContent='center'
                                alignItems='center'
                                margin='3rem'
                                style={{ flex: '1 0 18%' }}>
                                <img src={Image} alt='......' width='280em' />
                            </FlexContainer>
                        ))}
                    </FlexContainer>
                </FadeInContainer>
            </FadeInContainer>
        </Loader>
    );
};

export default HomeScreen;
