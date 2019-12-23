import React from 'react';
import {notification} from 'antd';
import {Redirect} from 'react-router-dom';
import uuid from "uuid";
import {connect} from 'react-redux';

const ErrorNotification = (props) => {
    return props.errors.map((error) => {
        if (error === 404) {
            return (<Redirect key={uuid()} to={"/page404"}/>)
        }
        notification.error({message: error});
    });
};

export default connect()(ErrorNotification);