import React, {Fragment} from 'react';
import {Redirect} from 'react-router-dom';
import AppHeader from '../Header';
import {PageContainer} from '../../styles/globals';
import {searchItems} from '../../utils/searchItems';
import SearchPanel from '../SearchPanel';
import TweetList from '../TweetList';
import {connect} from 'react-redux';

const Hashtag = (props) => {
    const {isAuthorized} = props;
    const { items, search } = props.tweets;

    /* тут и на странице меншенов будет функционал получения постов по тегу и по меншену соответственно.
     *
      * а для этого , чтобы не перебирать все посты по тексту, будет лучше просто связывать их при сохранении в базу, типа
      *
      * ( создаешь пост, а на стороне сервера его нужно распарсить и связать меншены и теги, типа, к этому меншену или тегу привязаны эти посты , а к другому другие, и когда нужно будет сделать выборку , просто берем список постов , связанных с этими тегами и меншенами )
      *
      * да ,конечно, стоит разобраться в мелочах, типа когда меншена нет ( то есть имени автора, или когда тег уже есть ), но это мелочи.
      *
      * */

    return (
        <PageContainer>
            <Fragment>
                <AppHeader/>
                <SearchPanel/>
                <h1>HashTag page {isAuthorized}</h1>
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

export default connect( mapStateToProps )( Hashtag );