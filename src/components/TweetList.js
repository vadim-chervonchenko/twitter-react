import React from 'react';
import TwitterListItem from './TweetListItem';
import {ListWrapper} from '../styles/globals';

const TweetList = ( {filteredTweets} ) => {
	return (
		<ListWrapper className="list-group">
			{
				filteredTweets.map( ( item ) => {
					return (
						<TwitterListItem key={item.id} {...item} />
					);
				} )
			}
		</ListWrapper>
	);
};

export default TweetList;