import React from 'react';
import {addTweet} from '../../store/tweet/tweetActions';
import ItemForm from './ItemForm';
import {connect} from 'react-redux';

const ItemAddingForm = () => {
    return (
        <ItemForm
            handleAction={addTweet}
            submitButtonName="Add tweet"
            submitButtonPosition="center"
            formType="add"
        />
    );
};

export default connect( null, {addTweet} )( ItemAddingForm );