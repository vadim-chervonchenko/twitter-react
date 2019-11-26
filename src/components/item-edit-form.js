import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../store/twitter/actions.js';


class ItemEditForm extends Component {

    state = {
        label: ''
    };

    onUpdateItem = (e) => {
        e.preventDefault();

        const {state, itemId, formVisibilityChange} = this.props;
        this.props.updateTweet(state.mainState.items, itemId, this.state.label);

        formVisibilityChange();
    };

    onLabelChange = (e) => {
        this.setState({
            label: e.target.value
        });
    };

    render() {
        const formStyle = this.props.formVisibility ? '' : 'd-none';

        return (
            <form onSubmit={(e) => {
                this.onUpdateItem(e)
            }} className={`pt-3 ${formStyle}`}>
                <div className="form-group row">
                    <div className="col-sm-12">
                        <input
                            onChange={this.onLabelChange}
                            placeholder="Please edit your tweet"
                            value={this.state.label}
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

const mapStateToProps = (state) => {
    return {
        state
    }
};
const mapDispatchToProps = (dispatch) => {
    const {updateTweet} = bindActionCreators(actions, dispatch);

    return {
        updateTweet
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(ItemEditForm);