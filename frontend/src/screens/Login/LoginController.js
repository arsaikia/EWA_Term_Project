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
        isAuthenticationAttempted,
        authenticationError,
        setLoginFalse,
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
    const [rememberMe, setRememberMe] = useState(false);
    const [goHome, setGoHome] = useState(false);
    const [alreadyLoggedInUser, setAlreadyLoggedInUser] = useState('');

    const validateLogin = useCallback(() => {
        setGoHome(true);
        authenticateUser(email, password, rememberMe);
    }, [authenticateUser, email, password, rememberMe]);

    useEffect(() => {
        goHome && isUserAuthenticated && props.history.push('/home');
    }, [isUserAuthenticated, goHome, props.history]);

    useEffect(() => {
        setAlreadyLoggedInUser(Cookie.get('USER_NAME'));
        setLoginFalse();
    }, []);
    /*
     * On Browser Back
     */
    window.onpopstate = (e) => {
        Cookie.set('USER_NAME', alreadyLoggedInUser);
    };

    console.log('rememberMe', rememberMe);

    return (
        <LoginScreen
            setEmail={setEmail}
            setPassword={setPassword}
            setRememberMe={setRememberMe}
            validateLogin={validateLogin}
            isAuthenticationAttempted={isAuthenticationAttempted}
            isUserAuthenticated={isUserAuthenticated}
            authenticationError={authenticationError}
        />
    );
};

export { LoginController };
