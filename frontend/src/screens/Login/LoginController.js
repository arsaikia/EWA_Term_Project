import axios from 'axios';
import Cookie from 'js-cookie';
import { get, isEmpty } from 'lodash';
import React, { useContext, useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import LoginScreen from './LoginScreen';
import UserContext from '../../Context/User/userContext';

const LoginController = ({ ...props }) => {
    /*
     ***************************************************
     * GLOBAL STATE FROM CONTEXT API
     ***************************************************
     */
    const userContext = useContext(UserContext);
    const {
        authenticateUser,
        isUserAuthenticated,
        allRegisteredUsers,
        allRegisteredUsersFetched,
        getAllRegisteredUsers,
        registerUser,
        loggedInUser,
    } = userContext;
    /********************************************
     * Local States
     ********************************************/
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const validateLogin = useCallback(() => {
        if (!isUserAuthenticated) authenticateUser(email, password);
    }, [isUserAuthenticated, authenticateUser, email, password]);

    useEffect(() => {
        isUserAuthenticated && props.history.push('/home');
    }, [isUserAuthenticated, props.history]);

    /*
     * On Browser Back
     */
    window.onpopstate = (e) => {
        // setShowHeader(true);
    };

    return (
        <LoginScreen
            setEmail={setEmail}
            setPassword={setPassword}
            validateLogin={validateLogin}
        />
    );
};

export { LoginController };
