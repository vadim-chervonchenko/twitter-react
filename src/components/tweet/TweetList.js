import React from 'react';
import TwitterListItem from './TweetListItem';
import {ListWrapper} from '../../styles/globals';
import InfiniteScroll from 'react-infinite-scroller';
import {Spin} from 'antd';
import {InfinityScrollSpinner} from '../../styles/globals';

import {getListTweets} from '../../store/tweet/tweetActions';
import {connect} from "react-redux";
import uuid from "uuid";

const TweetList = (props) => {
    const { filteredTweets, getListTweets } = props;
    const { lastPage, currentPage } = props.pagination;
    const loadMoreTweets = async () => {
        await getListTweets(currentPage + 1);
    };
    const isHasMore = ( currentPage <= lastPage );

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
        pagination: state.tweets.pagination
    }
};

export default connect(mapStateToProps, {getListTweets})(TweetList);