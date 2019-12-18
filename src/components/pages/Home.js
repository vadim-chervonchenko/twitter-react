import React, {Fragment, Component} from 'react';
import {connect} from 'react-redux';
import ItemAddForm from '../tweet/ItemAddingForm';
import TweetList from '../tweet/TweetList';
import SearchPanel from '../tweet/SearchPanel';
import {getListTweets} from '../../store/tweet/tweetActions';
import AppHeader from '../Header';
import {PageContainer} from '../../styles/globals';
import {searchItems} from '../../utils/searchItems';

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

const mapStateToProps = (state) => {
    return {
        tweets: state.tweets
    }
};

export default connect( mapStateToProps, {getListTweets} )( Home );