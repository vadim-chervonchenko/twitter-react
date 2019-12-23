import {error} from 'redux-saga-requests';
import {setError} from '../error/errorActions';
import {
    ADD_TWEET,
    DELETE_TWEET,
    UPDATE_TWEET,
    GETALL_TWEETS
} from './tweetActions';

export const tweetMiddleware = (store) => (next) => async (action) => {
    switch (action.type) {
        case error(ADD_TWEET):
        case error(DELETE_TWEET):
        case error(UPDATE_TWEET):
        case error(GETALL_TWEETS):
            next(setError(action.payload.response));
            break;
        default:
            break;
    }
    return next(action);
};