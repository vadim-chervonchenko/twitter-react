import React from 'react';
import TwitterListItem from './TweetListItem';
import { TwitterListWrapper } from '../styles/globals.js';

const TweetList = ({filteredTweets}) => {

    console.log(filteredTweets);

    return (
        <TwitterListWrapper className="list-group">
            {
                filteredTweets.map((item) => {
                    return (
                        <TwitterListItem key={item.id} {...item} />
                    );
                })
            }
        </TwitterListWrapper>
    );
};

export default TweetList;