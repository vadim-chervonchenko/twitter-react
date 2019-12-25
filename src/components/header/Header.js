import React from 'react';
import NavBar from './NavBar';
import Logo from './Logo';
import MainPageMenu from './MainPageMenu';

const Header = () => {
    return (
        <div className="bg-light">
            <div className="container">
                <nav className="navbar navbar-light mb-3">
                    <Logo/>
                    <NavBar>
                        <MainPageMenu/>
                    </NavBar>
                </nav>
            </div>
        </div>
    );
};

export default Header;
