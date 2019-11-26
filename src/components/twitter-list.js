import React from 'react';
import TwitterListItem from './twitter-list-item';

import { TwitterListWrapper } from '../styles/styles.js';


const TwitterList = ({filteredTweets}) => {
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

export default TwitterList;