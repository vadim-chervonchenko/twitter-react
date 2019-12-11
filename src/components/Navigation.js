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
        const {isAuthorized} = this.props; // вот через эту переменную будем проверять, залогинен ли пользователь или нет.

        /* children нужно УБРАТЬ, и пока не понятно на что их заменить , но нужно передавать параметр , авторизован ли пользователь или нет. */

        /* + разобраться с exact, как оно работает, а то пока не понятно. */


        /* ошибки вынести в сюда или в апп, пока не понятно куда лучше.\ */

        return (
            <Router>
                <Switch>
                    <PrivateRoute path={'/'} exact component={Home} user={accessToken}/> {/* сюда передавать isAuthorized */}
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

const mapStateToProps = (state) => {
    return {
        isAuthorized: state.auth.isAuthorized
    }
};

export default connect(mapStateToProps, null)(Navigation);