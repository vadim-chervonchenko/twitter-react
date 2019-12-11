import React, {Fragment} from 'react';
import {Redirect} from 'react-router-dom';
import '../RegistrationForm.js';
import RegistrationForm from '../RegistrationForm';
import AppHeader from '../Header';
import {PageContainer} from '../../styles/globals';

const Registration = ( props ) => {
    return (
        <Fragment>
            {props.user && <Redirect to='/'/>}
            <AppHeader/>
            <PageContainer>
                <RegistrationForm { ...props }/> {/* если нужно, то сюда лучше передать все параметры ,чтобы использовать потом */}
            </PageContainer>
        </Fragment>
    );
};

export default Registration;