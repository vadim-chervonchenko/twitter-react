import React, {Fragment, Component} from 'react';
import AppHeader from '../header/Header';
import {PageContainer} from '../../styles/globals';
import TweetList from '../tweet/TweetList';
import {getListTweets, emptyPosts} from '../../store/tweet/tweetActions';
import {connect} from 'react-redux';

class Mentions extends Component {
	state = {
		mentionName: ''
	};

    componentDidMount() {
        const {name: mentionName = ''} = this.props.match.params;
        this.getMentionPosts(mentionName);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.match.params.name!==this.props.match.params.name) {
            const {name: mentionName = ''} = this.props.match.params;
            this.getMentionPosts(mentionName);
        }
    }

    getMentionPosts = (mentionName) => {
        this.props.getListTweets( {mentions: mentionName} );
        this.props.emptyPosts();

        this.setState( {
            mentionName
        });
    };

	render() {
		const {mentionName} = this.state;

		return (
			<Fragment>
				<AppHeader/>
				<PageContainer>
					<h5 className="mb-4">All posts for mention: <strong>{mentionName}</strong></h5>
					<TweetList/>
				</PageContainer>
			</Fragment>
		);
	}
}

export default connect( null, {getListTweets, emptyPosts} )( Mentions );