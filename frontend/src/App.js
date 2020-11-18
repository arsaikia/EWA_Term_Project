import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import {
    Container as MyContainer,
    FlexContainer,
} from './components/StylingComponents';
import React, { useState, useEffect, useContext } from 'react';
import UserState from './Context/User/UserState';
import AppState from './Context/AppContext/AppState';
import Login from './screens/Login/LoginScreen';
import Header from './components/Header';
import Footer from './components/Footer';
import Routes from './Routes';
import { Colors } from './components/Colors';
import Loader from './components/Loader';

import AppContext from './Context/AppContext/appContext';

const App = (props) => {
    /*
     ***************************************************
     * GLOBAL STATE FROM CONTEXT API
     ***************************************************
     */

    // const appContext = useContext(AppContext);
    // const {showHeader, setShowHeader} = appContext;

    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <Router>
            <AppState>
                <UserState>
                    <MyContainer backgroundColor={Colors.backgroundColor} fluid>
                        <Routes showDropdown={showDropdown} setShowDropdown={setShowDropdown} />
                    </MyContainer>
                </UserState>
            </AppState>
        </Router>
    );
};

export default App;
