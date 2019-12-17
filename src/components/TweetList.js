import React from 'react';
import TwitterListItem from './TweetListItem';
import {ListWrapper} from '../styles/globals';
import InfiniteScroll from 'react-infinite-scroller';
import {Spin} from 'antd';
import {InfinityScrollSpinner} from '../styles/globals';

import {getListTweets} from '../store/tweet/tweetActions';
import {connect} from "react-redux";

const TweetList = (props) => {
    const {filteredTweets, getListTweets, lastPage} = props;

    const getTweets = async () => {
        let nextPage = 0;
        nextPage++;
        await getListTweets(nextPage);
    };

    return (
        <ListWrapper className="list-group">
            {
                <InfiniteScroll
                    pageStart={nextPage}
                    loadMore={getTweets}
                    hasMore={nextPage <= lastPage}
                    threshold={100}
                    loader={
                        <InfinityScrollSpinner>
                            <Spin/>
                        </InfinityScrollSpinner>
                    }
                >
                    {filteredTweets.map((item) => {
                        return (
                            <TwitterListItem key={item.id} {...item} />
                        );
                    })}
                </InfiniteScroll>
            }
        </ListWrapper>
    );
};

const mapStateToProps = (state) => {
    return {
        lastPage: state.tweets.pagination.lastPage
    }
};

export default connect(mapStateToProps, {getListTweets})(TweetList);