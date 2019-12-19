import React, {Fragment, Component} from 'react';
import {connect} from 'react-redux';
import ItemAddForm from '../tweet/ItemAddingForm';
import TweetList from '../tweet/TweetList';
import SearchPanel from '../tweet/SearchPanel';
import {getListTweets} from '../../store/tweet/tweetActions';
import AppHeader from '../Header';
import {PageContainer} from '../../styles/globals';

class Home extends Component {
    componentDidMount() {
        this.props.getListTweets();
    };

    render() {
        return (
            <Fragment>
                <AppHeader/>
                <PageContainer>
                    <SearchPanel/>
                    <ItemAddForm/>
                    <TweetList/>
                </PageContainer>
            </Fragment>
        );
    }
}

export default connect(null, {getListTweets})(Home);