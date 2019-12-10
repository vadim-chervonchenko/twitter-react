import React, {Fragment} from 'react';
import LoginForm from '../LoginForm.js';
import {Redirect} from 'react-router-dom';
import AppHeader from '../Header';
import {PageContainer} from '../../styles/globals';

const Authorization = ( props ) => {
	return (
		<Fragment>
			{props.user && <Redirect to={'/'}/>}
			<AppHeader/>
			<PageContainer>
				<LoginForm {...props}/>
			</PageContainer>
		</Fragment>
	);
};

export default Authorization