import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {TwitterAppNavBar, TwitterAppNavBarItem} from '../styles/globals';
import {connect} from 'react-redux';
import {logOut} from '../store/auth/AuthActions';
import {notification} from 'antd';

class Header extends Component {

    /* тут тоже не могу понять так ли это делается или нет, нужно выяснить и как лучше обработать ошибки */
	componentDidUpdate( prevProps, prevState, snapshot ) {
		this.showErrors();
	}

	/* мне не знавиться как организованы ошибки, нужно разобраться как сделать лучше и доделать, а то пока не понятно */
	showErrors = () => {
		if ( this.props.notification !== '' ) {
			notification.error( {
				message: this.props.notification
			} );
		}
	};

	/* это тоже нужно убрнать или разнести по отдельным функциям */
	logout = () => {
		localStorage.clear();
		this.props.logOut();
	};

	render() {
		const user = this.props.accessToken; // переделать под isAuthorized

        /* разобраться, как правильно скрывать компоненты на странице, при условии, что отдельные флаги скрыты */
		return (
			<div className="bg-light">
				<div className="container">
					<nav className="navbar navbar-light mb-3">
						<a className="navbar-brand" href="./">
							<img src="/assets/tweet-icon.svg" width="30" height="30"
							     className="d-inline-block align-top mr-2"
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
							{!user ?
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
										onClick={() => {
											this.logout()
										}}
									>Log out</NavLink>
								</TwitterAppNavBarItem>
							}
						</TwitterAppNavBar>
					</nav>
				</div>
			</div>
		);
	};
}

const mapStateToProps = (state) => {
    return {
        accessToken: state.auth.user.access_token,
        notification: state.errors.errors
    }
};

export default connect(mapStateToProps, {logOut})( Header );
