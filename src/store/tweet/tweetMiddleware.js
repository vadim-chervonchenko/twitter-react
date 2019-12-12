import {success, error} from "redux-saga-requests";
import {setError} from '../error/errorAction';
import {
    ADD_TWEET,
    DELETE_TWEET,
    UPDATE_TWEET,
    GETALL_TWEETS,
    getListTweets
} from './tweetActions';

export const tweetMiddleware = (store) => (next) => async (action) => {
    switch (action.type) {
        case success(ADD_TWEET):
        case success(DELETE_TWEET):
        case success(UPDATE_TWEET):
            await next(getListTweets());
            break;
        case error(ADD_TWEET):
        case error(DELETE_TWEET):
        case error(UPDATE_TWEET):
        case error(GETALL_TWEETS):
            next(setError(action.error.message));
            break;
        default:
            break;
    }
    return next(action);
};