import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {setSearchQuery} from "../store/tweet/TweetActions";

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

export default connect(
    state => ({
        state
    }),
    { setSearchQuery }
)(SearchPanel);