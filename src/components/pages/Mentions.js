import React, {Fragment, Component} from 'react';
import AppHeader from '../Header';
import {PageContainer} from '../../styles/globals';
import SearchPanel from '../tweet/SearchPanel';
import TweetList from '../tweet/TweetList';
import {getListTweets} from '../../store/tweet/tweetActions';
import {connect} from 'react-redux';

class Mentions extends Component {
    state = {
        mentionName: ''
    };

    componentDidMount() {
        const {name: mentionName = ''} = this.props.match.params;
        this.setState({
            mentionName
        });
        this.props.getListTweets({ page: 1, mention: mentionName });
    }

    render() {
        const { mentionName } = this.state;

        return (
            <PageContainer>
                <Fragment>
                    <AppHeader/>
                    <SearchPanel/>
                    <h1>All posts for mention: {mentionName}</h1>
                    <TweetList queryParams={{ mention: mentionName}}/>
                </Fragment>
            </PageContainer>
        );
    }
}

export default connect(null, {getListTweets})(Mentions);