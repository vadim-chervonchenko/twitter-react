import React, {Component} from 'react';
import ItemEditForm from './item-edit-form';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../store/twitter/actions/tweet-actions.js';

import { TwitterListItemWrap } from '../styles/styles';

class TwitterListItem extends Component {

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
        const {id, state} = this.props;
        this.props.delTweet(id, state)
    };

    render() {
        const {content, id} = this.props;

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
                <ItemEditForm
                    formVisibilityChange={this.formVisibility}
                    formVisibility={this.state.formVisibility}
                    onUpdateItem={this.onUpdateItem}
                    editLabel={content}
                    itemId={id}
                />
            </TwitterListItemWrap>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        state
    }
};
const mapDispatchToProps = (dispatch) => {
    const {delTweet} = bindActionCreators(actions, dispatch);
    return {
        delTweet
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(TwitterListItem);