import React, {Fragment, Component} from 'react';
import AppHeader from '../Header';
import {PageContainer} from '../../styles/globals';
import {searchItems} from '../../utils/searchItems';
import {getHashTags} from '../../store/tweet/tweetActions';
import SearchPanel from '../tweet/SearchPanel';
import TweetList from '../tweet/TweetList';
import {connect} from 'react-redux';

class Hashtag extends Component {

    state = {
        hashtagName: ''
    };

    componentDidMount() {
        this.setState({
            hashtagName: this.props.match.params.name
        });

        this.props.getHashTags(this.props.match.params.name);
    }

    render() {
        const {isAuthorized} = this.props;
        const {items, search} = this.props.tweets;

        return (
            <PageContainer>
                <Fragment>
                    <AppHeader/>
                    <SearchPanel/>
                    <h1>HashTag page {isAuthorized}</h1>
                    <TweetList
                        filteredTweets={searchItems(items, search)}
                    />
                </Fragment>
            </PageContainer>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        tweets: state.tweets
    }
};

export default connect( mapStateToProps, { getHashTags } )( Hashtag );