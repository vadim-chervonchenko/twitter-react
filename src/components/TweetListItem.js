import React, {Component} from 'react';
import ItemEditForm from './ItemEditingForm';
import {connect} from 'react-redux';
import {TwitterListItemWrap} from '../styles/globals';
import {delTweet} from '../store/tweet/TweetActions';
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
        const {content, id, user, created_at, updated_at} = this.props;

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
                <div className="pl-3">user : {user.name}</div>
                <div className="pl-3">create post : {moment(created_at).fromNow()}</div>
                <div className="pl-3">update post : {moment(updated_at).fromNow()}</div>
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
    null,
    {delTweet}
)(TweetListItem);