import React, {Component, Fragment} from 'react';
import {NavLink} from 'react-router-dom';
import  {AppNavBarItem} from '../../styles/globals';
import {connect} from 'react-redux';
import {logOut} from '../../store/auth/authActions';

class MainPageMenu extends Component {
    render() {
        const {isAuthorized, logOut} = this.props;

        return (
            <Fragment>
                {isAuthorized && <AppNavBarItem className="nav-item">
                    <NavLink
                        className="nav-link"
                        to="/"
                        exact
                    >Home</NavLink>
                </AppNavBarItem>}
                <AppNavBarItem className="nav-item">
                    <NavLink
                        className="nav-link"
                        to="/about"
                    >About</NavLink>
                </AppNavBarItem>
                {!isAuthorized ?
                    <AppNavBarItem className="nav-item">
                        <NavLink
                            className="nav-link"
                            to="/login"
                        >Log in</NavLink>
                    </AppNavBarItem> :
                    <AppNavBarItem className="nav-item">
                        <NavLink
                            className="nav-link"
                            to="/logout"
                            onClick={() => {
                                logOut()
                            }}
                        >Log out</NavLink>
                    </AppNavBarItem>
                }
            </Fragment>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        isAuthorized: state.auth.isAuthorized
    }
};

export default connect(mapStateToProps, {logOut})(MainPageMenu);
