import React from 'react';
import {Route, Redirect} from 'react-router-dom';

const PrivateRoute = ( {component: Component, ...rest} ) => (
	<Route {...rest} render={props => (
		rest.user
			? <Component {...props} />
			: <Redirect to={{pathname: '/auth', state: {from: props.location}}}/>
	)}/>
);

export default PrivateRoute;