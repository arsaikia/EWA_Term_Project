import React, { useContext } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import AppContext from './Context/AppContext/appContext';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Home from './screens/Home';
import Products from './screens/Products';
import Header from './components/Header';
import Footer from './components/Footer';

const Routes = (props) => {
    const appContext = useContext(AppContext);
    const {
        showHeader,
        setShowHeader,
        showDropdown,
        setShowDropdown,
    } = appContext;

    return (
        <>
            <Header
                showHeader={showHeader}
                setShowHeader={setShowHeader}
                showDropdown={showDropdown}
                setShowDropdown={setShowDropdown}
                props={props}
            />
            <main>
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

                    <Route path={'/products/:productId'}>
                        return{' '}
                        <Products
                            setShowHeader={setShowHeader}
                            setShowDropdown={setShowDropdown}
                            showHeader={showHeader}
                            props={props}
                        />
                    </Route>

                    {/*  Fallback Path*/}
                    <Route
                        render={() => (
                            <Redirect
                                to={{
                                    pathname: '/home',
                                }}
                            />
                        )}
                    />
                </Switch>
            </main>
            <Footer showHeader={showHeader} />
        </>
    );
};

export default Routes;
