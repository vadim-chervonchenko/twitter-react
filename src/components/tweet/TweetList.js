import React from 'react';
import TwitterListItem from './TweetListItem';
import {ListWrapper} from '../../styles/globals';
import {connect} from 'react-redux';
import {searchItems} from '../../utils/searchItems';
import { Empty } from 'antd';

const TweetList = ( props ) => {
	const {tweets: {items, search}} = props;

    return (
        <ListWrapper className="list-group">
            {
                (items.length !== 0) ?
                    searchItems(items, search).map((item) => {
                        return (
                            <TwitterListItem key={item.id} {...item} />
                        );
                    })
                    :
                    <Empty/>
            }
        </ListWrapper>
    );
};

const mapStateToProps = ( state ) => {
	return {
		tweets: state.tweets
	}
};

export default connect( mapStateToProps )( TweetList );