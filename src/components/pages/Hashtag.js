import React, {Fragment, Component} from 'react';
import AppHeader from '../Header';
import {PageContainer} from '../../styles/globals';
import {getHashTags} from '../../store/tweet/tweetActions';
import SearchPanel from '../tweet/SearchPanel';
import TweetList from '../tweet/TweetList';
import {connect} from 'react-redux';

class Hashtag extends Component {
    state = {
        hashTagName: ''
    };

    componentDidMount() {
        const {name: hashTagName = ''} = this.props.match.params;
        this.setState({
            hashTagName
        });
        this.props.getListTweets({page: 1, hashtag: hashTagName });
    }

    render() {
        const { hashTagName } = this.state;

        return (
            <PageContainer>
                <Fragment>
                    <AppHeader/>
                    <SearchPanel/>
                    <h1>All posts for hashtag: {hashTagName}</h1>
                    <TweetList queryParams={{ hashtag: hashTagName}}/>
                </Fragment>
            </PageContainer>
        );
    };
}

export default connect(null, {getHashTags})(Hashtag);