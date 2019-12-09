import React, {Component} from 'react';
import {connect} from 'react-redux';
import { updateTweet } from "../store/tweet/TweetActions";

class ItemEditingForm extends Component {
    state = {
        content: ''
    };

    onUpdateItem = (e) => {
        e.preventDefault();

        const {itemId, formVisibilityChange} = this.props;
        this.props.updateTweet(
            itemId,
            this.state.content
        );
        formVisibilityChange();
    };

    onContentChange = (e) => {
        this.setState({
            content: e.target.value
        });
    };

    render() {
        const {formVisibilityToggle} = this.props;
        const formStyle = formVisibilityToggle ? '' : 'd-none';

        return (
            <form onSubmit={(e) => {
                this.onUpdateItem(e)
            }} className={`pt-3 ${formStyle}`}>
                <div className="form-group row">
                    <div className="col-sm-12">
                        <input
                            onChange={this.onContentChange}
                            placeholder="Please edit your tweet"
                            value={this.state.content}
                            className="form-control mb-3"
                        />
                        <button
                            className="btn btn-outline-primary"
                        >Edit Tweet
                        </button>
                    </div>
                </div>
            </form>
        );
    };
}

export default connect(
    state => ({
        state
    }),
    {updateTweet}
)(ItemEditingForm);