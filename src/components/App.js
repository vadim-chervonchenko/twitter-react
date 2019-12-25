import React from 'react';
import Navigation from './navigation/Navigation.js';
import {appInit} from '../store/auth/authActions';
import {connect} from 'react-redux';
import 'antd/dist/antd.css';
import ErrorNotification from './ErrorNotification';
import {BrowserRouter as Router} from 'react-router-dom';

class App extends React.Component {
    componentWillMount() {
        this.props.appInit();
    }

    render() {
        const { isAuthorized } = this.props;
        const { errorsArr } = this.props.errors;

        return (
            <Router>
                <Navigation isAuthorized={isAuthorized}/>
                <ErrorNotification errors={errorsArr}/>
            </Router>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        isAuthorized: state.auth.isAuthorized,
        errors: state.errors
    }
};

export default connect( mapStateToProps, { appInit } )(App);