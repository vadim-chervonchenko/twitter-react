import React, {Fragment} from 'react';
import {notification} from 'antd';

const ErrorNotification = (props) => {
    const errors = props.errors.map((error) => {
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