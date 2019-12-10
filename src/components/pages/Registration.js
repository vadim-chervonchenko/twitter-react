import React, {Fragment} from 'react';
import {Redirect} from 'react-router-dom';
import '../RegistrationForm.js';
import RegistrationForm from '../RegistrationForm';
import AppHeader from '../Header';
import {PageContainer} from '../../styles/globals';

const Registration = (props) => {
    return (
        <Fragment>
            {props.user && <Redirect to='/'/>}
            <AppHeader/>
            <PageContainer>
                <RegistrationForm/>
            </PageContainer>
        </Fragment>
    );
};

export default Registration;