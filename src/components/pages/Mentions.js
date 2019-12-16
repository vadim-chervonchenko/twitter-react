import React, {Fragment} from 'react';
import {Redirect} from 'react-router-dom';
import AppHeader from '../Header';
import {PageContainer} from '../../styles/globals';
import {searchItems} from '../../utils/app';
import SearchPanel from '../SearchPanel';
import TweetList from '../TweetList';
import {connect} from 'react-redux';

const Mentions = (props) => {
    const {isAuthorized} = props;
    const { items, search } = props.tweets;

    return (
        <PageContainer>
            <Fragment>
                <AppHeader/>
                <SearchPanel/>
                <h1>Mentions page {isAuthorized}</h1>
                <TweetList
                    filteredTweets={searchItems( items, search )}
                />
            </Fragment>
        </PageContainer>
    );
};

const mapStateToProps = (state) => {
    return {
        tweets: state.tweets
    }
};

export default connect( mapStateToProps )( Mentions );