import React, {Fragment} from 'react';
import {reduxForm} from 'redux-form';
import {Redirect} from 'react-router-dom';
import '../RegistrationForm.js';
import RegisterForm from "../RegistrationForm";
import AppHeader from '../Header';

const Registration = (props) => {
    const {user} = props;

    return (
        <Fragment>
            {user && <Redirect to='/'/>}
            <AppHeader/>
            <RegisterForm {...props}/>
        </Fragment>
    );
};

export default reduxForm({
    form: 'register',
})(Registration);