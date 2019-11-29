import React, {Component} from 'react';

import Home from './pages/home';
import About from './pages/about';
import LoginPage from './pages/authorization';
import SignUp from './pages/registration';
import AppHeader from './app-header';
import PrivateRoute from './private-route';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as tweetActions from '../store/twitter/actions/tweet-actions.js';
import * as authActions from '../store/twitter/actions/auth-actions.js';

import {TwitterAppWrapper} from '../styles/styles.js';

class AppNavigation extends Component {
    render() {
        const user = localStorage.getItem('access_token');

        return (
            <Router>
                <AppHeader user={user}/>
                <TwitterAppWrapper>
                    <Switch>
                        <PrivateRoute path={'/'} exact component={Home} user={user}/>
                        <Route path={'/about'} component={About}/>
                        <Route path={'/auth'} children={() => {
                            return <LoginPage user={user} onSubmit={(formData) => {
                                this.props.loginsUser(formData)
                            }}/>
                        }}/>
                        <Route path={'/signup'} children={() => {
                            return <SignUp user={user} onSubmit={(formData) => {
                                this.props.registersUser(formData)
                            }}/>
                        }}/>
                    </Switch>
                </TwitterAppWrapper>
            </Router>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        state
    }
};
const mapDispatchToProps = (dispatch) => {
    const {addTweet} = bindActionCreators(tweetActions, dispatch);
    const {registersUser, loginsUser} = bindActionCreators(authActions, dispatch);
    return {
        addTweet,
        registersUser,
        loginsUser
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(AppNavigation);