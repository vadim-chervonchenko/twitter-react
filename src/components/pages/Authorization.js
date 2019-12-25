import React, {Fragment} from 'react';
import {Redirect} from 'react-router-dom';
import LoginForm from '../auth/LoginForm.js';
import AppHeader from '../header/Header';
import {PageContainer} from '../../styles/globals';

const Authorization = ( props ) => {
	return (
		<Fragment>
			{props.isAuthorized && <Redirect to={'/'}/>}
			<AppHeader/>
			<PageContainer>
				<LoginForm {...props}/>
			</PageContainer>
		</Fragment>
	);
};

export default Authorization