import React, {Fragment} from 'react';
import Navigation from './navigation/Navigation.js';
import {appInit} from '../store/auth/authActions';
import {connect} from 'react-redux';
import 'antd/dist/antd.css';

class App extends React.Component {
    componentDidMount() {
        this.props.appInit();
    }

    render() {
        return (
            <Fragment>
                <Navigation/>
            </Fragment>
        );
    };
}

export default connect( null, { appInit } )(App);