import React, {Component} from 'react';
import ItemEditForm from './ItemEditingForm';
import {connect} from 'react-redux';
import {TwitterListItemWrap} from '../styles/globals';
import {delTweet} from "../store/twitter/TweetActions";
import moment from 'moment';

class TweetListItem extends Component {

    state = {
        formVisibility: false
    };

    formVisibility = () => {
        this.setState({
            formVisibility: !this.state.formVisibility
        });
    };

    onUpdateItem = (content) => {
        this.props.onUpdateItem(content);
        this.setState({
            formVisibility: !this.state.formVisibility
        });
    };

    deleteTweet = () => {
        this.props.delTweet(this.props.id)
    };

    render() {
        const {content, id, user, created_at} = this.props;

        return (
            <TwitterListItemWrap className="list-group-item twitter-item" key={id}>
                <span>{content}</span>
                <button onClick={this.deleteTweet}
                        className="btn btn-outline-danger btn-sm float-right">
                    <i className="fa fa-trash-o"></i>
                </button>
                <button onClick={() => {
                    this.formVisibility()
                }}
                        className="btn btn-outline-primary btn-sm mr-3 float-right">
                    <i className="fa fa-edit"></i>
                </button>
                <span className="pl-3">{user.name}</span>
                <span className="pl-3">{moment(created_at).fromNow()}</span>
                <ItemEditForm
                    formVisibilityChange={this.formVisibility}
                    formVisibilityToggle={this.state.formVisibility}
                    onUpdateItem={this.onUpdateItem}
                    editLabel={content}
                    itemId={id}
                />
            </TwitterListItemWrap>
        );
    };
}

export default connect(
    state => ({
        state
    }),
    {delTweet}
)(TweetListItem);