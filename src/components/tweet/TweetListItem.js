import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ListItemWrap, PostContent} from '../../styles/globals';
import {delTweet} from '../../store/tweet/tweetActions';
import {setError} from '../../store/error/errorActions';
import moment from 'moment';
import {Link} from "react-router-dom";
import uuid from 'uuid';
import ItemEditingForm from './ItemEditingForm';
import {Card, Icon, Avatar} from 'antd';
import {getAvatarColor} from '../../utils/colors';


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
        const {content, id, author, created_at, delTweet} = this.props;
        const contentWithTagsMentions = this.handledHashTagMention(content);
        const {Meta} = Card;

        return (
            <ListItemWrap>
                <Card
                    actions={[
                        <Icon type="setting" key="setting"/>,
                        <Icon type="delete" key="delete" onClick={() =>
                            delTweet(this.props.id)
                        }/>
                    ]}
                    key={id}
                >
                    <Meta
                        avatar={
                            <Avatar
                                style={{backgroundColor: getAvatarColor(author.name)}}
                            >
                                {author.name[0].toUpperCase()}
                            </Avatar>}
                        title={`Author : ${author.name}`}
                        description={moment(created_at).fromNow()}
                    />
                    <PostContent
                        onClick={this.toggleFormVisibility}
                    >
                        {(!this.state.formVisibility) ?
                            contentWithTagsMentions
                            :
                            <ItemEditingForm
                                toggleFormVisibility={this.toggleFormVisibility}
                                content={content}
                                id={this.props.id}
                            />}
                    </PostContent>
                </Card>
            </ListItemWrap>
        );
    };
}

export default connect(null, {delTweet, setError})(TweetListItem);