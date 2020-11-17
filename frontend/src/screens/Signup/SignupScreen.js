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
    GetFormData,
    validateEmail,
    selectedPreference,
    setSelectedPreference,
}) => {
    return (
        <FadeInContainer
            style={{ display: showHeader ? 'None' : 'flex' }}
            width='100%'
            height='100%'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
            fadeIn
            duration={'500'}>
            <FlexContainer
                justifyContent='center'
                alignItems='center'
                width='50%'
                minWidth='400px'
                padding='60px 30px'
                backgroundColor='white'
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
                            onBlur={validateEmail}
                            required
                        />
                        {fieldOnFocus !== 'email' && !isEmpty(error.type) && (
                            <Alert variant={'danger'}>
                                {get(error.msg, error.type) || 'Email Error'}
                            </Alert>
                        )}
                    </div>

                    <div className='form-group'>
                        <label>First Name</label>
                        <input
                            type='text'
                            className='form-control'
                            placeholder='Enter email'
                            onChange={(e) => setFirstName(e.target.value)}
                            onFocus={() => setFieldOnFocus('fName')}
                        />
                    </div>
                    <div className='form-group'>
                        <label>Last Name</label>
                        <input
                            type='text'
                            className='form-control'
                            placeholder='Enter email'
                            onChange={(e) => setLastName(e.target.value)}
                            onFocus={() => setFieldOnFocus('lName')}
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
                        <Form.Control
                            as='select'
                            className='mr-sm-2'
                            id='inlineFormCustomSelect'
                            onChange={(e) =>
                                setSelectedPreference(e.target.value)
                            }
                            custom>
                            <option value='0'>
                                Select what best describes your food preferenes{' '}
                            </option>
                            <option value='1'>Vegan</option>
                            <option value='2'>Meat</option>
                            <option value='3'>Healthy</option>
                        </Form.Control>
                    </div>
                    <div className='form-group'>
                        <div className='custom-control custom-checkbox'>
                            <input
                                type='checkbox'
                                className='custom-control-input'
                                id='customCheck1'
                                onChange={(e) =>
                                    GetFormData('rememberMe', e.target.checked)
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
                        disabled={isEmpty(email) || isEmpty(password)}
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
    );
};

export default SignupScreen;
