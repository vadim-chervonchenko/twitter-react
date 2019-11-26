import React, {Component, Fragment} from 'react';
import {bindActionCreators} from 'redux';
import * as actions from '../store/twitter/actions.js';
import {connect} from 'react-redux';

class SearchPanel extends Component {

    render() {
        const {setSearchQuery} = this.props;

        return (
            <Fragment>
                <label>
                    <strong>Search tweet : </strong>
                </label>
                <input
                    type="text"
                    className="form-control mb-4 col-md-6"
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        counter: state.mainState
    }
};

const mapDispatchToProps = (dispatch) => {
    const {setSearchQuery} = bindActionCreators(actions, dispatch);
    return {
        setSearchQuery
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPanel);