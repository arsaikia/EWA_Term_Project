import axios from 'axios';
import Cookie from 'js-cookie';
import { get, isEmpty } from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import isEmail from 'validator/lib/isEmail';
import { useParams } from 'react-router-dom';
import SignupScreen from './SignupScreen';
import API from '../../utils/Query';

const SignupController = ({ showHeader, setShowHeader, ...props }) => {
    /********************************************
     * Local States
     ********************************************/
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [selectedPreference, setSelectedPreference] = useState(0);
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState({
        type: '',
        msg: { email: '', fName: '', lname: '', password: '' },
    });
    const [fieldOnFocus, setFieldOnFocus] = useState('');

    /********************************************
     * On Load Use Effects
     ********************************************/

    // On Load/Page refresh,  make sure header is hidden
    useEffect(() => {
        setShowHeader(false);
        // getAllUsers();
    }, []);

    /********************************************
     * Frm Data check handlers
     ********************************************/

    const validateEmail = () => {
        console.log('Vali', email);
        if (!isEmail(email)) {
            setError({
                type: 'email',
                msg: {
                    email: 'Email should be in format hello@eatdresh.com',
                    fName: '',
                    lname: '',
                    password: '',
                },
            });
        }
    };

    const GetFormData = (fieldName, value) => {};

    // Get All registered Users
    const getAllUsers = async () => {
        const response = await API.GET({ url: 'users' });
        const allUsers = get(response.data, 'data');
        console.log('allUsers', allUsers);
    };

    /* Create A User
     * Expected Request Body:
     * {
     *  "email": "arsaikia@gmail.com",
     *  "firstName": "Arunabh",
     *  "lastName": "Saikia",
     *  "password": "#2fxvUdcS#",
     *  "userType": "ADMIN",
     *  "foodPreference": "VEGAN"
     *  }
     */
    const createUser = async () => {
        const response = await API.POST({
            url: 'users',
            body: {
                email: email,
                firstName: firstName,
                lastName: lastName,
                password: password,
                userType: 'CUSTOMER',
                foodPreference: selectedPreference,
            },
        });

        console.log(response.data.data.id, response.data.success);
        Cookie.set(
            'USER_ID',
            get(get(get(response, 'data') || '', 'data') || '', 'id') || ''
        );
        Cookie.set('REMEMBER_USER', rememberMe);
    };

    const registerUser = () => {
        setShowHeader(true);
        createUser();
    };

    /*
     * On Browser Back
     */
    window.onpopstate = (e) => {
        setShowHeader(true);
    };

    return (
        <SignupScreen
            setEmail={setEmail}
            email={email}
            setPassword={setPassword}
            password={password}
            setFirstName={setFirstName}
            firstName={firstName}
            setLastName={setLastName}
            lastName={lastName}
            validateEmail={validateEmail}
            fieldOnFocus={fieldOnFocus}
            setFieldOnFocus={setFieldOnFocus}
            error={error}
            registerUser={registerUser}
            showHeader={showHeader}
            GetFormData={GetFormData}
            setRememberMe={setRememberMe}
            setSelectedPreference={setSelectedPreference}
            selectedPreference={selectedPreference}
        />
    );
};

export { SignupController };
