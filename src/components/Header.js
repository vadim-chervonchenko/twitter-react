import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {TwitterAppNavBar, TwitterAppNavBarItem} from '../styles/globals';
import {connect} from 'react-redux';
import {logOut} from "../store/twitter/AuthActions";

class Header extends Component {
    logout = () => {
        localStorage.clear();
        this.props.logOut();
    };

    render() {
        const user = this.props.accessToken;

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
                    {! user ?
                        <TwitterAppNavBarItem className="nav-item">
                            <NavLink
                                className="nav-link"
                                to="/auth"
                            >Log in</NavLink>
                        </TwitterAppNavBarItem> :
                        <TwitterAppNavBarItem className="nav-item">
                            <NavLink
                                className="nav-link"
                                to="/logout"
                                onClick={ () => { this.logout() } }
                            >Log out</NavLink>
                        </TwitterAppNavBarItem>
                    }
                </TwitterAppNavBar>
            </nav>
        );
    };
}

export default connect(
    state => ({
        accessToken: state.auth.data.access_token
    }),
    {logOut}
)(Header);
