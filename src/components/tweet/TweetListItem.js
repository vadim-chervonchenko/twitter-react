import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ListItemWrap} from '../../styles/globals';
import {
    delTweet,
    updateTweet
} from '../../store/tweet/tweetActions';
import {setError} from '../../store/error/errorActions';
import moment from 'moment';
import {Link} from "react-router-dom";
import uuid from 'uuid';
import ItemEditingForm from './ItemEditingForm';

class TweetListItem extends Component {
    state = {
        formVisibility: false
    };

    toggleFormVisibility = () => {
        this.setState({
            formVisibility: !this.state.formVisibility
        });
    };

    handledHashTagMention = (content) => {
        const hashTagRegex = new RegExp(/(#\S*)/g);
        const mentionRegex = new RegExp(/(@S*)/g);

        return content.split(" ").map((item) => {
            if (hashTagRegex.test(item)) {
                return <Link to={`/hashtag/${item.replace('#', '')}`} key={uuid.v4()}>{item} </Link>;
            } else if (mentionRegex.test(item)) {
                return <Link to={`/mention/${item.replace('@', '')}`} key={uuid.v4()}>{item} </Link>;
            }
            return `${item} `;
        });
    };

    render() {
        const {content, id, author, created_at, updated_at, delTweet} = this.props;
        const contentWithTagsMentions = this.handledHashTagMention(content);

        return (
            <ListItemWrap className="list-group-item twitter-item" key={id}>
                <span>  {
                    (!this.state.formVisibility) ?
                        contentWithTagsMentions :
                        <ItemEditingForm
                            toggleFormVisibility={this.toggleFormVisibility}
                            content={content}
                        />
                }</span>
                <button onClick={() => delTweet(this.props.id)}
                        className="btn btn-outline-danger btn-sm float-right">
                    <i className="fa fa-trash-o"></i>
                </button>
                <button onClick={() => {
                    this.toggleFormVisibility()
                }}
                        className="btn btn-outline-primary btn-sm mr-3 float-right">
                    <i className="fa fa-edit"></i>
                </button>
                <div className="pl-3">author : {author.name}</div>
                <div className="pl-3">create post : {moment(created_at).fromNow()}</div>
                <div className="pl-3">update post : {moment(updated_at).fromNow()}</div>
            </ListItemWrap>
        );
    };
}

export default connect(null, {delTweet, updateTweet, setError})(TweetListItem);