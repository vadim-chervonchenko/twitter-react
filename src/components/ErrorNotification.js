import React, {Fragment} from 'react';
import {notification} from 'antd';

const ErrorNotification = (props) => {
    const errors = props.errors.map((error) => {
        notification.error({message: error})
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