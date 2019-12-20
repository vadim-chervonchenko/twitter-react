import React, {Fragment} from 'react';
import {notification} from 'antd';
import {Redirect} from 'react-router-dom';
import uuid from "uuid";

const ErrorNotification = (props) => {
    const errors = props.errors.map((error) => {
        if (error === 404) {
            return (<Redirect key={uuid()} to={"/page404"}/>)
        }

        notification.error({message: error});
        return true;
    });

    return (
        <Fragment>
            {errors}
        </Fragment>
    );
};

export default ErrorNotification;