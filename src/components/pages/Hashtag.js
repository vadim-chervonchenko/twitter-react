import React, {Fragment} from 'react';
import {Redirect} from 'react-router-dom';
import AppHeader from '../Header';
import {PageContainer} from '../../styles/globals';

const Hashtag = (props) => {
    const {isAuthorized} = props;

    return (
        <PageContainer>
            <Fragment>
                <AppHeader/>
                <div>this is hash tag page {isAuthorized}</div>
            </Fragment>
        </PageContainer>
    );
};

export default Hashtag;