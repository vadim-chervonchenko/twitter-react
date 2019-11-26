import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../store/twitter/actions.js';
import {bindActionCreators} from 'redux';

import { TwitterAddForm, TwitterAddFormTextarea } from "../styles/styles";

class ItemAddForm extends Component {

    state = {
        label: '',
        alertType: ''
    };

    onLabelChange = (e) => {
        this.setState({label: e.target.value});
    };

    onSubmit = (e) => {
        e.preventDefault();

        const alertType = this.state.label ? 'is-valid' : 'is-invalid';
        if (this.state.label) {
            this.props.addTweet(this.state.label);
        }
        this.setState({
            label: '',
            alertType: alertType
        });
    };

    render() {
        const {label, alertType} = this.state;

        return (
            <div className="container p-0">
                <TwitterAddForm onSubmit={this.onSubmit}>
                    <div className="form-group row">
                        <div className="col-sm-12">
                              <TwitterAddFormTextarea
                                  onChange={this.onLabelChange}
                                  placeholder="Please enter your tweet"
                                  value={label}
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

const mapStateToProps = (state) => {
    return {
        state
    }
};
const mapDispatchToProps = (dispatch) => {
    const { addTweet } = bindActionCreators(actions, dispatch);
    return {
        addTweet
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(ItemAddForm);