import React, { Component, useState } from 'react';
import styled from 'styled-components';
import {
    Container,
    FlexContainer,
    Spacing,
    FadeInContainer,
} from '../../components/StylingComponents/index';
import './login.css';
import { Popup } from '../../components/Popup/index';

const LoginScreen = ({
    showHeader,
    setEmail,
    setPassword,
    getUsersHandler,
}) => {
    // const [showPopup, setShowPopup] = useState(!false);
    // const [zipCode, setZipCode] = useState('60616');
    // console.log('zipCode', zipCode);

    return (
        <FadeInContainer
            style={{ display: showHeader ? 'None' : 'flex' }}
            width='100%'
            height='100vh'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
            fadeIn
            duration={'300'}>
            {/* <Popup
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
            /> */}

            <FlexContainer
                justifyContent='center'
                alignItems='center'
                width='380px'
                padding='30px'
                backgroundColor='white'
                borderRadius='20px'>
                <Container>
                    <>
                        <FlexContainer
                            justifyContent='center'
                            alignItems='center'>
                            <strong>
                                <h2>Log in</h2>
                            </strong>
                        </FlexContainer>
                        <Spacing space='20px' mobileSpace='10px' />
                        <div className='form-group'>
                            <label>Email</label>
                            <input
                                type='email'
                                className='form-control'
                                placeholder='Enter email'
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className='form-group'>
                            <label>Password</label>
                            <input
                                type='password'
                                className='form-control'
                                placeholder='Enter password'
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className='form-group'>
                            <div className='custom-control custom-checkbox'>
                                <input
                                    type='checkbox'
                                    className='custom-control-input'
                                    id='customCheck1'
                                />
                                <label
                                    className='custom-control-label'
                                    htmlFor='customCheck1'>
                                    Remember me
                                </label>
                            </div>
                        </div>
                        <button
                            type='submit'
                            className='btn btn-dark btn-lg btn-block'
                            onClick={getUsersHandler}>
                            Sign in
                        </button>
                        <p className='forgot-password text-right'>
                            Forgot <a href='#'>password?</a>
                        </p>
                        <Spacing space='20px' mobileSpace='10px' />
                    </>
                </Container>
            </FlexContainer>
        </FadeInContainer>
    );
};

export default LoginScreen;
