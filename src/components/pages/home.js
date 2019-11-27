import React, {Fragment, Component} from 'react';
import ItemAddForm from '../item-add-form';
import TwitterList from '../twitter-list';
import SearchPanel from '../search-panel';
import {connect} from 'react-redux';
import * as actions from '../../store/twitter/actions/tweet-actions.js';
import {bindActionCreators} from 'redux';

class Home extends Component {

    componentDidMount() {
        this.props.getListTwets();
    };

    searchItems = (items, search) => {
        if (search.length === 0) {
            return items;
        }
        return items.filter((item) => {
            return item.content.toLowerCase().indexOf(search.toLowerCase()) > -1;
        });
    };

    render() {
        const {items, search} = this.props.state.tweets;
        const filteredTweets = this.searchItems(items, search);

        return (
            <Fragment>
                <SearchPanel/>
                <ItemAddForm/>
                <TwitterList
                    filteredTweets={filteredTweets}
                />
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        state
    }
};
const mapDispatchToProps = (dispatch) => {
    const {getListTwets} = bindActionCreators(actions, dispatch);
    return {
        getListTwets
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);