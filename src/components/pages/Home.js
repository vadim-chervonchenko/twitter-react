import React, {Fragment, Component} from 'react';
import ItemAddForm from '../ItemAddingForm';
import TweetList from '../TweetList';
import SearchPanel from '../SearchPanel';
import {connect} from 'react-redux';
import {getListTweets} from '../../store/tweet/TweetActions';
import AppHeader from '../Header';
import {TwitterAppWrapper} from '../../styles/globals';

class Home extends Component {
    componentDidMount() {
        this.props.getListTweets();
    };

    searchItems = (items = [], search = '') => {
        if (search.length === 0) {
            return items;
        }
        return items.filter((item) => {
            return item.content.toLowerCase().indexOf(search.toLowerCase()) > -1;
        });
    };

    render() {
        const {items, search} = this.props.tweetsData;

        return (
            <Fragment>
                <AppHeader/>
                <TwitterAppWrapper>
                    <SearchPanel/>
                    <ItemAddForm/>
                    <TweetList
                        filteredTweets={this.searchItems(items, search)}
                    />
                </TwitterAppWrapper>
            </Fragment>
        );
    }
}

export default connect(
    state => ({
        tweetsData: state.tweets,
        authData: state.auth.data
    }),
    {
        getListTweets
    }
)(Home);