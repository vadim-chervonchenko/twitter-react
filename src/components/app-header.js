import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import { TwitterAppNavBar, TwitterAppNavBarItem } from '../styles/styles';
import * as actions from '../store/twitter/actions/auth-actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class AppHeader extends Component {

    logout = () => {
        localStorage.clear();
        this.props.logOut();
    };

    render () {
        const {user} = this.props;

        return (
            <nav className="navbar navbar-light bg-light mb-3">
                <a className="navbar-brand" href="./">
                    <img src="/assets/tweet-icon.svg" width="30" height="30" className="d-inline-block align-top mr-2"
                         alt=""/>
                    Tweeter react app
                </a>
                <TwitterAppNavBar className="navbar-nav">
                    {user && <TwitterAppNavBarItem className="nav-item">
                        <NavLink
                            className="nav-link"
                            to="/"
                            exact
                        >Home</NavLink>
                    </TwitterAppNavBarItem>}
                    <TwitterAppNavBarItem className="nav-item">
                        <NavLink
                            className="nav-link"
                            to="/about"
                        >About</NavLink>
                    </TwitterAppNavBarItem>
                    { ! user && <TwitterAppNavBarItem className="nav-item">
                        <NavLink
                            className="nav-link"
                            to="/auth"
                        >Log in</NavLink>
                    </TwitterAppNavBarItem>}
                    { user && <TwitterAppNavBarItem className="nav-item">
                        <NavLink
                            className="nav-link"
                            to="/auth"
                            onClick={() => {this.logout()}}
                        >Log out</NavLink>
                    </TwitterAppNavBarItem>}
                </TwitterAppNavBar>
            </nav>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        state
    }
};
const mapDispatchToProps = (dispatch) => {
    const {logOut} = bindActionCreators(actions, dispatch);
    return {
        logOut
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);
