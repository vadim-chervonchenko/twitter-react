import React, {Component} from 'react';
import {connect} from 'react-redux';

import { TwitterAddForm, TwitterAddFormTextarea } from "../styles/globals";
import {addTweet} from "../store/twitter/TweetActions";

class ItemAddingForm extends Component {

    state = {
        content: '',
        alertType: ''
    };

    onLabelChange = (e) => {
        this.setState({content: e.target.value});
    };

    onSubmit = (e) => {
        e.preventDefault();
        const alertType = this.state.content ? 'is-valid' : 'is-invalid';
        if (this.state.content) {
            this.props.addTweet(this.state.content);
        }
        this.setState({
            content: '',
            alertType: alertType
        });
    };

    render() {
        const {content, alertType} = this.state;

        return (
            <div className="container p-0">
                <TwitterAddForm onSubmit={this.onSubmit}>
                    <div className="form-group row">
                        <div className="col-sm-12">
                              <TwitterAddFormTextarea
                                  onChange={this.onLabelChange}
                                  placeholder="Please enter your tweet"
                                  value={content}
                                  className={`form-control ${alertType}`}
                              > </TwitterAddFormTextarea>
                            <button className="btn btn-outline-primary">Add new Tweet</button>
                        </div>
                    </div>
                </TwitterAddForm>
            </div>
        );
    };
}

export default connect(
    state => ({
        state
    }),
    {addTweet}
)(ItemAddingForm);