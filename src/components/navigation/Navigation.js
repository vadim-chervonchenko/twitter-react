import React from 'react';
import Home from '../pages/Home';
import About from '../pages/About';
import Authorization from '../pages/Authorization';
import Registration from '../pages/Registration';
import PrivateRoute from './PrivateRoute';
import Hashtag from '../pages/Hashtag';
import Mentions from '../pages/Mentions';
import Page404 from '../pages/Page404';
import {Route, Switch} from 'react-router-dom';

const Navigation = (props) => {
    const {isAuthorized} = props;

    return (
        <Switch>
            <PrivateRoute path="/" exact component={Home} isAuthorized={isAuthorized}/>
            <Route path="/about" component={About}/>
            <Route path="/login" render={() => <Authorization isAuthorized={isAuthorized}/>}/>
            <Route path="/register" render={() => <Registration isAuthorized={isAuthorized}/>}/>
            <Route path="/logout" render={() => <Authorization isAuthorized={isAuthorized}/>}/>
            <Route path="/hashtag/:name" render={(props) => <Hashtag {...props} isAuthorized={isAuthorized}/>}/>
            <Route path="/mention/:name" render={(props) => <Mentions {...props} isAuthorized={isAuthorized}/>}/>
            <Route path='/Page404' component={Page404}/>
            <Route from='*' exact={true} component={Page404}/>
        </Switch>
    );
};


export default (Navigation);