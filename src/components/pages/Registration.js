import React, {Fragment} from 'react';
import {Redirect} from 'react-router-dom';
import '../RegistrationForm.js';
import RegisterForm from "../RegistrationForm";
import AppHeader from '../Header';

import {TwitterAppWrapper} from '../../styles/globals';

const Registration = (props) => {
    return (
        <Fragment>
            {props.user && <Redirect to='/'/>}
            <AppHeader/>
            <TwitterAppWrapper>
                <RegisterForm/>
            </TwitterAppWrapper>
        </Fragment>
    );
};

export default Registration;