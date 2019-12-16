import React, {Fragment} from 'react';
import {notification} from 'antd';

const ErrorNotification = (props) => {
    const errors = props.errors.map((i) => {
        notification.error({message: i})
    });

    return (
        <Fragment>
            <div>
                {errors}
            </div>
        </Fragment>
    );
};

export default ErrorNotification;