import React, {Fragment} from 'react';
import {reduxForm} from 'redux-form';
import {Redirect} from 'react-router-dom';
import '../registration-form.js';
import RegisterForm from "../registration-form";
import { rules, validateReduxForm } from '../../utils/redux-form-validator'


const Registration = (props) => {
    return (
        <Fragment>
            {props.user && <Redirect to='/'/>}
            <RegisterForm {...props}/>
        </Fragment>
    );
};

export default reduxForm({
    form: 'signup',
    validate: validateReduxForm(rules),
    initialValues: {
        settings: {
            auto_sms: 1,
            auto_mail: 1,
        },
    },
    destroyOnUnmount: true
})(Registration);