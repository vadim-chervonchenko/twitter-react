import React, {Component} from 'react';

import Home from './pages/Home';
import About from './pages/About';
import LoginPage from './pages/Authorization';
import SignUp from './pages/Registration';
import PrivateRoute from './PrivateRoute';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import {connect} from 'react-redux';

import {addTweet} from '../store/twitter/TweetActions.js';
import {registerUser, loginUser} from '../store/twitter/AuthActions.js';

import {TwitterAppWrapper} from '../styles/globals.js';

class Navigation extends Component {
    render() {
        /*const user = localStorage.getItem('access_token');*/
        const {loginUser, registerUser} = this.props;

        const user = this.props.state.auth.data.access_token;

        return (
            <Router>
                <TwitterAppWrapper>
                    <Switch>
                        <PrivateRoute path={'/'} exact component={Home} user={user}/>
                        <Route path={'/about'} component={About}/>
                        <Route path={'/auth'} children={() => {
                            return <LoginPage user={user} onSubmit={(formData) => {
                                loginUser(formData)
                            }}/>
                        }}/>
                        <Route path={'/signup'} children={() => {
                            return <SignUp user={user} onSubmit={(formData) => {
                                registerUser(formData)
                            }}/>
                        }}/>
                    </Switch>
                </TwitterAppWrapper>
            </Router>
        );
    };
}

export default connect(
    state => ({
        state
    }),
    {
        addTweet,
        registerUser,
        loginUser
    }
)(Navigation);