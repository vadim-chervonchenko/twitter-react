import React, {Fragment} from 'react';
import {reduxForm} from 'redux-form';
import LoginForm from '../login-form.js';
import {Redirect} from 'react-router-dom';
import { rules, validateReduxForm } from '../../utils/redux-form-validator'

const LoginPage = (props) => {
    return (
        <Fragment>
            {props.user && <Redirect to={'/'}/>}
            <LoginForm {...props}/>
        </Fragment>
    );
};

export default reduxForm({
    form: 'auth',
    validate: validateReduxForm(rules),
    initialValues: {
        settings: {
            auto_sms: 1,
            auto_mail: 1,
        },
    },
    destroyOnUnmount: true
})(LoginPage);