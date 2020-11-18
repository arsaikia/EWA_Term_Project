import axios from 'axios';
import Cookie from 'js-cookie';
import { get, isEmpty } from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import HomeScreen from './HomeScreen';
import AppContext from '../../Context/AppContext/appContext';

const HomeController = ({ setShowDropdown, ...props }) => {
    const appContext = useContext(AppContext);
    const { showHeader, setShowHeader } = appContext;
    /*
     * On Browser Back
     */
    window.onpopstate = (e) => {};

    useEffect(() => {
        setShowHeader('SHOW');
    }, []);

    return (
        <>
            <HomeScreen setShowDropdown={setShowDropdown} />
        </>
    );
};

export { HomeController };
