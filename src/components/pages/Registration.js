import React, {Fragment} from 'react';
import {Redirect} from 'react-router-dom';
import '../auth/RegistrationForm.js';
import RegistrationForm from '../auth/RegistrationForm';
import AppHeader from '../header/Header';
import {PageContainer} from '../../styles/globals';

const Registration = ( props ) => {
    return (
        <Fragment>
            {props.isAuthorized && <Redirect to='/'/>}
            <AppHeader/>
            <PageContainer>
                <RegistrationForm { ...props }/>
            </PageContainer>
        </Fragment>
    );
};

export default Registration;