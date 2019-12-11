import React from 'react';
import Navigation from './Navigation.js';
import {appInit} from '../store/auth/AuthActions';
import {connect} from 'react-redux';


class App extends React.Component {
    componentDidMount() {
        this.props.appInit();
    }

    render() {
        return (
            <Navigation/>
        );
    };
}

export default connect( null, { appInit } )(App);