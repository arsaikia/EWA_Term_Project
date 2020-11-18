import axios from 'axios';
import Cookie from 'js-cookie';
import { get, isEmpty } from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import HomeScreen from './HomeScreen';

const HomeController = ({ showHeader, setShowHeader,setShowDropdown, ...props }) => {
    /*
     * On Browser Back
     */
    window.onpopstate = (e) => {};

    return <HomeScreen setShowDropdown={setShowDropdown}/>;
};

export { HomeController };
