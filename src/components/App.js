import React, {Fragment} from 'react';
import AppNavigation from './Navigation.js';
import {setJwtToken} from "../store/auth/AuthActions";
import {connect} from "react-redux";

class App extends React.Component {
    componentDidMount() {
        this.props.setJwtToken();
    }

    render() {
        return (
            <Fragment>
                <AppNavigation/>
            </Fragment>
        );
    };
}

export default connect(
    state => ({
        state
    }),
    {
        setJwtToken
    }
)(App);