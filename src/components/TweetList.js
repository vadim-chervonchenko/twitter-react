import React from 'react';
import TwitterListItem from './TweetListItem';
import {ListWrapper} from '../styles/globals';
import InfiniteScroll from 'react-infinite-scroller';
import {Spin} from 'antd';
import {InfinityScrollSpinner} from '../styles/globals';

import {getListTweets} from '../store/tweet/tweetActions';
import {connect} from "react-redux";

let nextPage = 0;

const TweetList = (props) => {
    const {filteredTweets, getListTweets, lastPage} = props;

    const getTweets = async () => {
        nextPage++;
        await getListTweets(nextPage);

        console.log(nextPage);
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
        lastPage: state.tweets.lastPage
    }
};

export default connect(mapStateToProps, {getListTweets})(TweetList);