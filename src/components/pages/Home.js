import React, {Fragment, Component} from 'react';
import {connect} from 'react-redux';
import ItemAddForm from '../ItemAddingForm';
import TweetList from '../TweetList';
import SearchPanel from '../SearchPanel';
import {getListTweets} from '../../store/tweet/tweetActions';
import AppHeader from '../Header';
import {PageContainer} from '../../styles/globals';
import {searchItems} from '../../utils/app';

class Home extends Component {
	componentDidMount() {
		this.props.getListTweets();
	};

	render() {
		const {items, search} = this.props.tweets;

		return (
			<Fragment>
				<AppHeader/>
				<PageContainer>
					<SearchPanel/>
					<ItemAddForm/>
					<TweetList
						filteredTweets={searchItems( items, search )}
					/>
				</PageContainer>
			</Fragment>
		);
	}
}

export default connect(({tweets}) => ({tweets}), {getListTweets})( Home );