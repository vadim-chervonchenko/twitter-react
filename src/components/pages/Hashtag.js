import React, {Fragment, Component} from 'react';
import AppHeader from '../Header';
import {PageContainer} from '../../styles/globals';
import {getListTweets} from '../../store/tweet/tweetActions';
import TweetList from '../tweet/TweetList';
import {connect} from 'react-redux';

class Hashtag extends Component {
	state = {
		hashTagName: ''
	};

	componentDidMount() {
		const {name: hashTagName} = this.props.match.params;
		this.props.getListTweets({hashtag: hashTagName });

		this.setState({
			hashTagName: hashTagName
		});
	}

	render() {
		const {hashTagName} = this.state;

		return (
			<Fragment>
				<AppHeader/>
				<PageContainer>
					<h5 className="mb-4">All posts for hashtag: <strong>{hashTagName}</strong></h5>
					<TweetList/>
				</PageContainer>
			</Fragment>
		);
	};
}

export default connect( null, {getListTweets} )( Hashtag );