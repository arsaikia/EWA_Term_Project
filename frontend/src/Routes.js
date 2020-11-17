import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import Login from './screens/Login';
import Signup from './screens/Signup';

const Routes = ({ showHeader, setShowHeader, props }) => {
	return (
		<>
			<Switch>
				<Route
					path={'/login'}
					render={(props) => <Login setShowHeader={setShowHeader} showHeader={showHeader} {...props} />}
				/>
				<Route
					path={'/signup'}
					render={(props) => <Signup setShowHeader={setShowHeader} showHeader={showHeader} {...props} />}
				/>
			</Switch>
		</>
	);
};

export default Routes;
