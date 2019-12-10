import React from 'react';
import TwitterListItem from './TweetListItem';
import {TwitterListWrapper} from '../styles/globals';

const TweetList = ( {filteredTweets} ) => {
	return (
		<TwitterListWrapper className="list-group">
			{
				filteredTweets.map( ( item ) => {
					return (
						<TwitterListItem key={item.id} {...item} />
					);
				} )
			}
		</TwitterListWrapper>
	);
};

export default TweetList;