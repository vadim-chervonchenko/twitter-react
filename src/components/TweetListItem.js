import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ListItemWrap} from '../styles/globals';
import {
    delTweet,
    updateTweet
} from '../store/tweet/tweetActions';
import { setError } from '../store/error/errorActions';
import moment from 'moment';
import {Button, Input, Form} from 'antd';
import {Link} from "react-router-dom";
import uuid from 'uuid';

class TweetListItem extends Component {
    state = {
        formVisibility: false
    };

    toggleFormVisibility = () => {
        this.setState({
            formVisibility: !this.state.formVisibility
        });
    };

    onUpdateItem = (e) => {
        const {id, updateTweet} = this.props;

        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                updateTweet(id, values.content);
                this.toggleFormVisibility();
            } else {

                let errors = [];
                for ( const error of err.content.errors ) {
                    errors.push(error.message);
                }

                this.props.setError(errors);
            }
        });
    };

    onPressEnter = (e) => {
        if (e.ctrlKey || e.metaKey) {
            const value = this.props.form.getFieldValue('content');
            this.props.form.setFieldsValue({
                content: value + '\n',
            });
        } else {
            this.onUpdateItem(e);
        }
    };

    handledHashTagMention = (content) => {
        const hashTagRegex = new RegExp(/(#\S*)/g);
        const mentionRegex = new RegExp(/(@S*)/g);

        return content.split(" ").map((i) => {
             if ( hashTagRegex.test(i) ) {
                 return <Link to={`/hashtag/${i.replace('#', '')}`} key={uuid.v4()}>{i} </Link>;
             } else if ( mentionRegex.test(i) ) {
                return  <Link to={`/mention/${i.replace('@', '')}`} key={uuid.v4()}>{i} </Link>;
             }
             return `${i} `;
        });
    };

    render() {
        const {content, id, author, created_at, updated_at, delTweet} = this.props;
        const { getFieldDecorator } = this.props.form;
        const contentWithTags = this.handledHashTagMention(content);

        return (
            <ListItemWrap className="list-group-item twitter-item" key={id}>
                <span>  {
                    (!this.state.formVisibility) ?
                        contentWithTags :
                        <Form onSubmit={this.onUpdateItem}>
                            <Form.Item>
                                {getFieldDecorator('content', {
                                    rules: [{required: true, message: 'Please input post content', whitespace: true, min: 1}],
                                    initialValue: content
                                })(
                                    <Input
                                        placeholder="Please edit your tweet"
                                        className="form-control mb-3"
                                        autoFocus
                                        onPressEnter={this.onPressEnter}
                                    />
                                )}
                                <Button type="primary" htmlType="submit">Edit tweet</Button>
                            </Form.Item>
                        </Form>
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

export default connect(null, {delTweet, updateTweet, setError})(Form.create({name: 'listItemForm'})(TweetListItem));