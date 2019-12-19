import React from 'react';
import TwitterListItem from './TweetListItem';
import {ListWrapper} from '../../styles/globals';
import InfiniteScroll from 'react-infinite-scroller';
import {Spin} from 'antd';
import {InfinityScrollSpinner} from '../../styles/globals';

import {getListTweets} from '../../store/tweet/tweetActions';
import {connect} from 'react-redux';
import uuid from 'uuid';
import {searchItems} from '../../utils/searchItems';

const TweetList = (props) => {

    const {
        getListTweets,
        pagination: {lastPage, currentPage},
        tweets: {items, search},
        queryParams
    } = props;
    const isHasMore = (currentPage <= lastPage);

    const loadMoreTweets = async () => {
        await getListTweets({page: currentPage + 1, ...queryParams});
    };

    return (
        <ListWrapper className="list-group">
            {
                <InfiniteScroll
                    pageStart={1}
                    loadMore={loadMoreTweets}
                    hasMore={isHasMore}
                    threshold={50}
                    loader={
                        <InfinityScrollSpinner key={uuid.v4()}>
                            <Spin/>
                        </InfinityScrollSpinner>
                    }
                >
                    {searchItems(items, search).map((item) => {
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
        pagination: state.tweets.pagination,
        tweets: state.tweets
    }
};

export default connect(mapStateToProps, {getListTweets})(TweetList);