import React from 'react';
import {NavLink} from 'react-router-dom';
import { TwitterAppNavBar, TwitterAppNavBarItem } from "../styles/styles";

const AppHeader = ({user}) => {
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
                        to="/About"
                    >About</NavLink>
                </TwitterAppNavBarItem>
                {user && <TwitterAppNavBarItem className="nav-item">
                    <NavLink
                        className="nav-link"
                        to="/logout" /* меняем state и перенаправляем на /login, где есть ссылка на регистрацию */
                    >Log out</NavLink>
                </TwitterAppNavBarItem>}
            </TwitterAppNavBar>
        </nav>
    );
};

export default AppHeader;
