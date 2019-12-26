import React, {Fragment, Component} from 'react';
import AppHeader from '../header/Header';
import {PageContainer} from '../../styles/globals';
import {getListTweets, emptyPosts} from '../../store/tweet/tweetActions';
import TweetList from '../tweet/TweetList';
import {connect} from 'react-redux';

class Hashtag extends Component {
	state = {
		hashTagName: ''
	};

	componentDidMount() {
		const {name: hashTagName} = this.props.match.params;
        this.getHashTagPosts(hashTagName);
	}

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.match.params.name!==this.props.match.params.name) {
            const {name: hashTagName} = this.props.match.params;
            this.getHashTagPosts(hashTagName);
        }
    }

    getHashTagPosts = (hashTagName) => {
        this.props.getListTweets({hashtag: hashTagName });
        this.props.emptyPosts();

        this.setState({
            hashTagName: hashTagName
        });
    };

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

export default connect( null, {getListTweets, emptyPosts} )( Hashtag );