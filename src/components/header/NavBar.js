import React from 'react';
import {AppNavBar} from '../../styles/globals';

const NavBar = (props) => {
    return (
        <AppNavBar className="navbar-nav">
            {props.children}
        </AppNavBar>
    );
};

export default NavBar;
