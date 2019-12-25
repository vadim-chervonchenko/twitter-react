import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ListItemWrap, PostContent} from '../../styles/globals';
import {delTweet} from '../../store/tweet/tweetActions';
import {setError} from '../../store/error/errorActions';
import moment from 'moment';
import {Link} from "react-router-dom";
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
        const regAll = /([#@]\w\S*)/g;
        const regHashteg = /([#]\w\S*)/g;
        const regMention= /([@]\w\S*)/g;
        const parts = content.split(regAll);

        return parts.map(part => {
            if (part.match(regHashteg)){
                return <Link key={part} to={`/hashtag/${part.replace('#','')}`} >{part}</Link>
            } else if (part.match(regMention)) {
                return <Link key={part} to={`/mention/${part.replace('@','')}`} >{part}</Link>
            } else {
                return part
            }
        })
    };

    render() {
        const {content, id, author, created_at, delTweet, user} = this.props;
        const isPostYour = ( author.id === user.id );
        const contentWithTagsMentions = this.handledHashTagMention(content);
        const {Meta} = Card;

        const authUser = [
            <Icon type="setting" key="setting"/>,
            <Icon type="delete" key="delete" onClick={() => delTweet( this.props.id )}/>,
            <Icon type="edit" key="edit" onClick={() => this.toggleFormVisibility()}/>
        ];
        const notAuthUser = [
            <Icon type="setting" key="setting"/>,
        ];

        return (
            <ListItemWrap>
                <Card
                    actions={isPostYour ? authUser : notAuthUser}
                    key={id}
                >
                    <Meta
                        avatar={
                            <Avatar
                                style={{backgroundColor: getAvatarColor(author.name)}}
                            >
                                {author.name[0].toUpperCase()}
                            </Avatar>}
                        title={`user : ${author.name}`}
                        description={moment(created_at).fromNow()}
                    />
                    <PostContent>
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

const mapStateToProps = ( state ) => {
    return {
        user: state.auth.user
    }
};

export default connect(mapStateToProps, {delTweet, setError})(TweetListItem);