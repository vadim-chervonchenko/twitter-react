import React, {Fragment} from 'react';
import Navigation from './Navigation.js';
import {appInit} from '../store/auth/authActions';
import {connect} from 'react-redux';
import 'antd/dist/antd.css';
import ErrorNotification from './ErrorNotification';


class App extends React.Component {
    componentDidMount() {
        this.props.appInit();
    }

    render() {
        const {errors} = this.props.errors;

        return (
            <Fragment>
                <ErrorNotification errors={errors}/>
                <Navigation/>
            </Fragment>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        errors: state.errors
    }
};

export default connect( mapStateToProps, { appInit } )(App);