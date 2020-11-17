import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { Container as MyContainer } from './components/StylingComponents';
import React, { useState, useEffect } from 'react';
// import { Login, Signup } from './components/Login';
import Login from './screens/Login/LoginScreen';
import Header from './components/Header';
import Footer from './components/Footer';
import Routes from './Routes';

const App = (props) => {
    const [showHeader, setShowHeader] = useState(true);
    const [showDropdown, setShowDropdown] = useState(false);

    // If there is no header to show, hide the menu
    useEffect(() => {
        !showHeader && setShowDropdown(false);
    }, [showHeader]);

    return (
        <Router>
            <>
                <Header
                    setShowHeader={setShowHeader}
                    showHeader={showHeader}
                    showDropdown={showDropdown}
                    setShowDropdown={setShowDropdown}
                    props={props}
                />

                <main className='py-3' onClick={() => setShowDropdown(false)}>
                    <Container
                        fluid
                        style={{ paddingTop: '120px' }}
                        width='100vw'>
                        <Container fluid>
                            <Routes
                                setShowHeader={setShowHeader}
                                showHeader={showHeader}
                            />
                        </Container>
                    </Container>
                </main>
                <Footer showHeader={showHeader} />
            </>
        </Router>
    );
};

export default App;
