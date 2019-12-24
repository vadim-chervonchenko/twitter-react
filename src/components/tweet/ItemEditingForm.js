import React from 'react';
import {updateTweet} from '../../store/tweet/tweetActions';
import ItemForm from './ItemForm';
import {connect} from 'react-redux';

const ItemEditingForm = (props) => {
    const { content, id, toggleFormVisibility } = props;

    return (
        <ItemForm
            toggleFormVisibility={toggleFormVisibility}
            content={content}
            id={id}

            handleAction={updateTweet}
            submitButtonName="Edit tweet"
            formType="edit"
        />
    )
};

export default connect( null, {updateTweet} )( ItemEditingForm );