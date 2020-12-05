import React, { Component, useState } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';
import Alert from 'react-bootstrap/Alert';
import { Button, Form } from 'react-bootstrap';
import { isEmpty, get } from 'lodash';
import {
    Container,
    FlexContainer,
    Spacing,
    FadeInContainer,
} from '../../components/StylingComponents/index';
import './login.css';
import { Popup } from '../../components/Popup';
import REGISTER from '../../Images/register.svg';

const SignupScreen = ({
    email,
    password,
    setEmail,
    setPassword,
    showHeader,
    fieldOnFocus,
    error,
    setFirstName,
    setLastName,
    setFieldOnFocus,
    registerUser,
    validateEmail,
    setSelectedPreference,
    validatePassword,
    rePassword,
    setRePassword,
}) => {
    return (
        <>
            <FadeInContainer
                style={{
                    display: showHeader ? 'None' : 'flex',
                    backgroundImage: `url(${REGISTER})`,
                    backgroundPosition: 'top',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '80%',
                }}
                width='100%'
                height='100vh'
                flexDirection='column'
                justifyContent='center'
                alignItems='center'
                alignSelf='center'
                fadeIn
                duration={'500'}>
                <FlexContainer
                    justifyContent='center'
                    alignItems='center'
                    alignSelf='center'
                    width='30%'
                    minWidth='400px'
                    padding='60px 30px'
                    backgroundColor='rgba(255,255,255,0.95)'
                    borderRadius='20px'>
                    <Container width='80%'>
                        <FlexContainer
                            justifyContent='center'
                            alignItems='center'
                            width='100%'>
                            <strong>
                                <h2>Register</h2>
                            </strong>
                        </FlexContainer>
                        <Spacing space='20px' mobileSpace='10px' />
                        <div className='form-group required'>
                            <label>Email</label>
                            <input
                                style={{ display: 'flex', width: '100%' }}
                                type='email'
                                className='form-control'
                                placeholder='Enter email'
                                onChange={(e) => setEmail(e.target.value)}
                                onFocus={() => setFieldOnFocus('email')}
                                onBlur={(e) => validateEmail(e.target.value)}
                                required
                            />
                            {fieldOnFocus !== 'email' &&
                                !isEmpty(error.type) &&
                                error.type === 'email' && (
                                    <Alert variant={'danger'}>
                                        {get(error.msg, error.type) ||
                                            'Email Error'}
                                    </Alert>
                                )}
                        </div>

                        <div className='form-group required'>
                            <label>First Name</label>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Enter email'
                                onChange={(e) => setFirstName(e.target.value)}
                                onFocus={() => setFieldOnFocus('fName')}
                            />
                        </div>
                        <div className='form-group required'>
                            <label>Last Name</label>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Enter email'
                                onChange={(e) => setLastName(e.target.value)}
                                onFocus={() => setFieldOnFocus('lName')}
                            />
                        </div>

                        <div className='form-group required'>
                            <label>Password</label>
                            <input
                                type='password'
                                className='form-control'
                                placeholder='Enter password'
                                onChange={(e) => setPassword(e.target.value)}
                                onBlur={validatePassword}
                                onFocus={() => setFieldOnFocus('password')}
                            />
                            {!isEmpty(error.type) &&
                                error.type === 'password' && (
                                    <Alert variant={'danger'}>
                                        {get(error.msg, 'password') ||
                                            'password Error'}
                                    </Alert>
                                )}
                        </div>

                        <div className='form-group required'>
                            <label>Confirm Password</label>
                            <input
                                type='password'
                                className='form-control'
                                placeholder='Confirm password'
                                onChange={(e) => setRePassword(e.target.value)}
                                onBlur={() => validatePassword('repassword')}
                                onFocus={() => setFieldOnFocus('repassword')}
                            />
                            {!isEmpty(error.type) &&
                                error.type === 'repassword' && (
                                    <Alert variant={'danger'}>
                                        {get(error.msg, 'password') ||
                                            'repassword Error'}
                                    </Alert>
                                )}
                        </div>

                        <div className='form-group'>
                            <Form.Control
                                as='select'
                                className='mr-sm-2'
                                id='inlineFormCustomSelect'
                                onChange={(e) => null}
                                custom>
                                <option value='CUSTOMER'>
                                    Select user type{' '}
                                </option>
                                <option value='CUSTOMER'>CUSTOMER</option>
                                <option value='ADMIN'>ADMIN</option>
                                <option value='STORE_MANAGER'>
                                    STORE_MANAGER
                                </option>
                            </Form.Control>
                        </div>

                        <div className='form-group'>
                            <Form.Control
                                as='select'
                                className='mr-sm-2'
                                id='inlineFormCustomSelect'
                                onChange={(e) =>
                                    setSelectedPreference(e.target.value)
                                }
                                custom>
                                <option value='ALL'>
                                    Select your food preferenes{' '}
                                </option>
                                <option value='VEGAN'>Vegan</option>
                                <option value='MEAT'>Meat</option>
                                <option value='HEALTHY'>Healthy</option>
                            </Form.Control>
                        </div>

                        <button
                            disabled={
                                isEmpty(email) ||
                                isEmpty(password) ||
                                !isEmpty(error.type)
                            }
                            type='submit'
                            className='btn btn-dark btn-lg btn-block'
                            onClick={registerUser}>
                            Register
                        </button>
                        <p className='forgot-password text-right'>
                            Already Registed{' '}
                            <a href='/login'>
                                <strong>Login Instead?</strong>
                            </a>
                        </p>
                        <Spacing space='20px' mobileSpace='10px' />
                    </Container>
                </FlexContainer>
            </FadeInContainer>
        </>
    );
};

export default SignupScreen;
