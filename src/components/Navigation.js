import React, {Component} from 'react';

import Home from './pages/Home';
import About from './pages/About';
import LoginPage from './pages/Authorization';
import SignUpPage from './pages/Registration';
import PrivateRoute from './PrivateRoute';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';

class Navigation extends Component {
    render() {
        const {accessToken} = this.props;

        return (
            <Router>
                <Switch>
                    <PrivateRoute path={'/'} exact component={Home} user={accessToken}/>
                    <Route path={'/about'} component={About}/>
                    <Route path={'/auth'} children={() => {
                        return <LoginPage user={accessToken}/>
                    }}/>
                    <Route path={'/signup'} children={() => {
                        return <SignUpPage user={accessToken}/>
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
    }), null
)(Navigation);