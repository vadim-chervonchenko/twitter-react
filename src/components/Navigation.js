import React, {Component} from 'react';

import Home from './pages/Home';
import About from './pages/About';
import LoginPage from './pages/Authorization';
import SignUp from './pages/Registration';
import PrivateRoute from './PrivateRoute';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';

import {addTweet} from '../store/tweet/TweetActions.js';
import {registerUser, loginUser} from '../store/auth/AuthActions.js';

class Navigation extends Component {
    render() {
        const {loginUser, registerUser, accessToken} = this.props;

        return (
            <Router>
                <Switch>
                    <PrivateRoute path={'/'} exact component={Home} user={accessToken}/>
                    <Route path={'/about'} component={About}/>
                    <Route path={'/auth'} children={() => {
                        return <LoginPage user={accessToken} onSubmit={(formData) => {
                            loginUser(formData)
                        }}/>
                    }}/>
                    <Route path={'/signup'} children={() => {
                        return <SignUp user={accessToken} onSubmit={(formData) => {
                            registerUser(formData)
                        }}/>
                    }}/>
                    <Route path={'/logout'} component={About}/>
                </Switch>
            </Router>
        );
    };
}

export default connect(
    state => ({
        accessToken: state.auth.user.access_token
    }),
    {
        addTweet,
        registerUser,
        loginUser
    }
)(Navigation);