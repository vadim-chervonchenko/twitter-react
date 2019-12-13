import React, {Component} from 'react';
import Home from './pages/Home';
import About from './pages/About';
import Authorization from './pages/Authorization';
import Registration from './pages/Registration';
import PrivateRoute from './PrivateRoute';
import Hashtag from './pages/Hashtag';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';

class Navigation extends Component {
    render() {
        const {isAuthorized} = this.props;

        return (
            <Router>
                <Switch>
                    <PrivateRoute path={'/'} exact component={Home} isAuthorized={isAuthorized}/>
                    <Route path={'/about'} component={About}/>
                    <Route path={'/login'} render={() => <Authorization isAuthorized={isAuthorized} />}/>
                    <Route path={'/register'} render={() => <Registration isAuthorized={isAuthorized} />}/>
                    <Route path={'/logout'} render={() => <Authorization isAuthorized={isAuthorized} />}/>


                    {/* отправлять по имени или id пока не понятно */}
                    <Route path={'/hashtag/:name'} render={() => <Hashtag isAuthorized={isAuthorized} />}/>
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

export default connect(mapStateToProps)(Navigation);