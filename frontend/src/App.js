import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Container as MyContainer } from './components/StylingComponents';
import React, { useState } from 'react';
import UserState from './Context/User/UserState';
import AppState from './Context/AppContext/AppState';
import Routes from './Routes';
import { Colors } from './components/Colors';
import CartState from './Context/Cart/CartState';

const App = (props) => {
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <Router>
            <AppState>
                <UserState>
                    <CartState>
                        <MyContainer
                            backgroundColor={Colors.backgroundColor}
                            fluid>
                            <Routes
                                showDropdown={showDropdown}
                                setShowDropdown={setShowDropdown}
                            />
                        </MyContainer>
                    </CartState>
                </UserState>
            </AppState>
        </Router>
    );
};

export default App;
