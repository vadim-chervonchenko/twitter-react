import React, {Component} from 'react';
import ItemEditForm from './ItemEditingForm';
import {connect} from 'react-redux';
import {TwitterListItemWrap} from '../styles/globals';
import {delTweet} from '../store/tweet/TweetActions';
import moment from 'moment';

class TweetListItem extends Component {


    /* тут печаль беда с названиями переменных и прочей лобудой, не совсем понятно зачем эти функции и че они делают и логика стэйта непонятная */
    state = {
        formVisibility: false
    };

    toggleFormVisibility = () => {
        this.setState({
            formVisibility: !this.state.formVisibility
        });
    };

    /* эта логика меня немного напрягает */
    onUpdateItem = (content) => {
        this.props.onUpdateItem(content);
        this.setState({
            formVisibility: !this.state.formVisibility
        });
    };

    /* это тут нужно или нет , непонятно , можно сразу напрямую запилить и вызывать через стрелку */
    deleteTweet = () => {
        this.props.delTweet(this.props.id)
    };

    render() {
        const {content, id, user, created_at, updated_at} = this.props;

        return (

            /* название этой обертки, просто бесит */
            <TwitterListItemWrap className="list-group-item twitter-item" key={id}>
                <span>{content}</span>
                <button onClick={this.deleteTweet}
                        className="btn btn-outline-danger btn-sm float-right">
                    <i className="fa fa-trash-o"></i>
                </button>
                <button onClick={() => {
                    this.toggleFormVisibility()
                }}
                        className="btn btn-outline-primary btn-sm mr-3 float-right">
                    <i className="fa fa-edit"></i>
                </button>
                <div className="pl-3">user : {user.name}</div>
                <div className="pl-3">create post : {moment(created_at).fromNow()}</div>
                <div className="pl-3">update post : {moment(updated_at).fromNow()}</div>
                <ItemEditForm

                    {/* параметры по ебанатски называются, нужно чет более или менее понятно использовать */}
                    formVisibilityChange={this.toggleFormVisibility}
                    formVisibilityToggle={this.state.formVisibility}
                    onUpdateItem={this.onUpdateItem}
                    editLabel={content}
                    itemId={id}
                />
            </TwitterListItemWrap>
        );
    };
}

export default connect(null, {delTweet})(TweetListItem);