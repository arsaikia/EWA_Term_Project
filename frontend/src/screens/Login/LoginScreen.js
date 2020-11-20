import React, { Component, useState } from 'react';
import styled from 'styled-components';
import { Alert } from 'react-bootstrap';
import {
    Container,
    FlexContainer,
    Spacing,
    FadeInContainer,
} from '../../components/StylingComponents/index';
import './login.css';
import { Popup } from '../../components/Popup/index';
import LOGIN from '../../Images/login.svg';

const LoginScreen = ({
    validateLogin,
    setEmail,
    setRememberMe,
    setPassword,
    isAuthenticationAttempted,
    isUserAuthenticated,
    authenticationError,
}) => {
    return (
        <FadeInContainer
            width='100%'
            height='100vh'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
            fadeIn
            duration={'300'}
            style={{
                backgroundImage: `url(${LOGIN})`,
                backgroundPosition: 'right',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '50%',
            }}>
            <FlexContainer
                justifyContent='center'
                alignItems='center'
                width='380px'
                padding='30px'
                backgroundColor='white'
                borderRadius='20px'
                opacity='1'
                // border='1px solid grey'
            >
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
                            {isAuthenticationAttempted &&
                                !isUserAuthenticated && (
                                    <Alert variant={'danger'}>
                                        {authenticationError}
                                    </Alert>
                                )}
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
                                    onChange={(e) =>
                                        setRememberMe(e.target.checked)
                                    }
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
                            className='btn btn-dark btn-logn btn-lg btn-block'
                            onClick={validateLogin}>
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
