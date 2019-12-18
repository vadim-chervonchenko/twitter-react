import React, {Fragment, Component} from 'react';
import AppHeader from '../Header';
import {PageContainer} from '../../styles/globals';
import { searchItems } from '../../utils/searchItems';
import SearchPanel from '../tweet/SearchPanel';
import TweetList from '../tweet/TweetList';
import { getMentions } from '../../store/tweet/tweetActions';
import {connect} from 'react-redux';

class Mentions extends Component {

    state = {
        mentionName: ''
    };

    componentDidMount() {
        this.setState({
            mentionName: this.props.match.params.name
        });

        this.props.getMentions(this.props.match.params.name);
    }

    render() {
        const {isAuthorized} = this.props;
        const {items, search} = this.props.tweets;

        return (
            <PageContainer>
                <Fragment>
                    <AppHeader/>
                    <SearchPanel/>
                    <h1>Mentions page {isAuthorized}</h1>
                    <TweetList
                        filteredTweets={searchItems(items, search)}
                    />
                </Fragment>
            </PageContainer>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        tweets: state.tweets
    }
};

export default connect(mapStateToProps, { getMentions })(Mentions);