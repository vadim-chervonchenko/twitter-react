import React from 'react';
import Navigation from './Navigation.js';
import {appInit} from '../store/auth/authActions';
import {connect} from 'react-redux';
import 'antd/dist/antd.css';


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