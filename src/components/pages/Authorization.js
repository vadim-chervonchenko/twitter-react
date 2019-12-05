import React, {Fragment} from 'react';
import {reduxForm} from 'redux-form';
import LoginForm from '../LoginForm.js';
import {Redirect} from 'react-router-dom';
import AppHeader from '../Header';

const LoginPage = (props) => {
    const {user} = props;

    return (
        <Fragment>
            {user && <Redirect to={'/'}/>}
            <AppHeader/>
            <LoginForm {...props}/>
        </Fragment>
    );
};

export default reduxForm({
    form: 'login'
})(LoginPage);