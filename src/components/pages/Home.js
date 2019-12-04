import React, {Fragment, Component} from 'react';
import ItemAddForm from '../ItemAddingForm';
import TweetList from '../TweetList';
import SearchPanel from '../SearchPanel';
import {connect} from 'react-redux';
import {getListTweets} from '../../store/twitter/TweetActions';
import AppHeader from '../Header';

class Home extends Component {
    componentDidMount() {
        this.props.getListTweets();
    };

    searchItems = (items, search = '') => {
        if (search.length === 0) {
            return items;
        }
        return items.filter((item) => {
            return item.content.toLowerCase().indexOf(search.toLowerCase()) > -1;
        });
    };

    render() {
        const {data, search} = this.props.state.tweets;
        const filteredTweets = this.searchItems(data, search);
        const user = this.props.state.auth.data.access_token;

        return (
            <Fragment>
                <AppHeader user={user}/>
                <SearchPanel/>
                <ItemAddForm/>
                <TweetList
                    filteredTweets={filteredTweets}
                />
            </Fragment>
        );
    }
}

export default connect(
    state => ({
        state
    }),
    {
        getListTweets
    }
)(Home);