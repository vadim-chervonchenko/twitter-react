import React, {Fragment} from 'react';
import LoginForm from '../LoginForm.js';
import {Redirect} from 'react-router-dom';
import AppHeader from '../Header';
import {TwitterAppWrapper} from '../../styles/globals';

const Authorization = (props) => {
    return (
        <Fragment>
            {props.user && <Redirect to={'/'}/>}
            <AppHeader/>
            <TwitterAppWrapper>
                <LoginForm {...props}/>
            </TwitterAppWrapper>
        </Fragment>
    );
};

export default Authorization