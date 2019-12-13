import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {AppNavBar, AppNavBarItem} from '../styles/globals';
import {connect} from 'react-redux';
import {logOut} from '../store/auth/authActions';
/*import {notification} from 'antd';*/

class Header extends Component {
	/*componentDidUpdate( prevProps, prevState, snapshot ) {
		this.showErrors();
	}*/

	/*showErrors = () => {
		if ( this.props.notification !== '' ) {
			notification.error({
				message: this.props.notification
			});
		}
	};*/

	render() {
		const {isAuthorized, logOut} = this.props;

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
						<AppNavBar className="navbar-nav">
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
							{! isAuthorized ?
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
										onClick={() => { logOut() }}
									>Log out</NavLink>
								</AppNavBarItem>
							}
						</AppNavBar>
					</nav>
				</div>
			</div>
		);
	};
}

const mapStateToProps = (state) => {
    return {
        isAuthorized: state.auth.isAuthorized,
        /*notification: state.errors.errors*/
    }
};

export default connect(mapStateToProps, {logOut})( Header );
