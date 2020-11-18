import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import Login from './screens/Login';
import Signup from './screens/Signup';
import Home from './screens/Home';

const Routes = ({ showHeader, setShowHeader,setShowDropdown, props }) => {
    return (
        <>
            <Switch>
                <Route
                    path={'/login'}
                    render={(props) => (
                        <Login
                            setShowHeader={setShowHeader}
                            showHeader={showHeader}
                            {...props}
                        />
                    )}
                />
                <Route
                    path={'/signup'}
                    render={(props) => (
                        <Signup
                            setShowHeader={setShowHeader}
                            showHeader={showHeader}
                            {...props}
                        />
                    )}
                />
                <Route
                    path={'/home'}
                    render={(props) => (
                        <Home
                            setShowHeader={setShowHeader}
                            showHeader={showHeader}
                            setShowDropdown={setShowDropdown}
                            {...props}
                        />
                    )}
                />
                <Route
                    render={(props) => (
                        <Home
                            setShowHeader={setShowHeader}
                            setShowDropdown={setShowDropdown}
                            showHeader={showHeader}
                            {...props}
                        />
                    )}
                />
            </Switch>
        </>
    );
};

export default Routes;
