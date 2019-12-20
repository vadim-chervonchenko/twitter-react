import React, {Fragment, Component} from 'react';
import AppHeader from '../Header';
import {PageContainer} from '../../styles/globals';
import TweetList from '../tweet/TweetList';
import {getListTweets} from '../../store/tweet/tweetActions';
import {connect} from 'react-redux';

class Mentions extends Component {
	state = {
		mentionName: ''
	};

	componentDidMount() {
		const {name: mentionName = ''} = this.props.match.params;
		this.props.getListTweets( {mentions: mentionName} );

		this.setState( {
			mentionName
		});
	}

	render() {
		const {mentionName} = this.state;

		return (
			<Fragment>
				<AppHeader/>
				<PageContainer>
					<h5>All posts for mention: <strong>{mentionName}</strong></h5>
					<TweetList/>
				</PageContainer>
			</Fragment>
		);
	}
}

export default connect( null, {getListTweets} )( Mentions );