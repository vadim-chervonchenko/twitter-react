import React from 'react';
import {Route, Redirect} from 'react-router-dom';

const PrivateRoute = ( {component: Component, ...rest} ) => (
	<Route {...rest} render={props => (
		rest.isAuthorized
			? <Component {...rest} />
			: <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
	)}/>
);

export default PrivateRoute;