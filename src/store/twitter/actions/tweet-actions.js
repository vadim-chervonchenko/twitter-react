import axios from 'axios';
import {tweetConstants} from '../../../types/constants.js';

axios.defaults.baseURL = '/api/';

export const getListTwets = () => ({
    type: tweetConstants.GETALL_REQUEST,
});
export const addTweet = (content) => ({
    type: tweetConstants.ADD_REQUEST,
    payload: {
        content
    }
});
export const delTweet = (id, state) => ({
    type: tweetConstants.DELETE_REQUEST,
    payload: {
        id, state
    }
});
export const updateTweet = (state, id, content) => ({
    type: tweetConstants.UPDATE_REQUEST,
    payload: {
        id, state, content
    }
});
export const setSearchQuery = (searchQuery) => ({
    type: tweetConstants.SEARCH_QUERY,
    payload: {
        searchQuery: searchQuery
    }
});