import axios from 'axios';
import Cookie from 'js-cookie';
import { get, isEmpty } from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LoginScreen from './LoginScreen';

const LoginController = ({ props }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    /*
     * On Browser Back
     */
    window.onpopstate = (e) => {
        // setShowHeader(true);
    };

    return <LoginScreen setEmail={setEmail} setPassword={setPassword} />;
};

export { LoginController };
