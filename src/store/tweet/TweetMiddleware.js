import {success, error} from "redux-saga-requests";
import {
    ADD_REQUEST,
    DELETE_REQUEST,
    UPDATE_REQUEST,
    GETALL_REQUEST,
    getListTweets
} from './TweetActions';
import {SHOW_ERROR_MODAL} from '../error/ErrorReducer';

export const tweetMiddleware = (store) => (next) => async (action) => {
    switch (action.type) {
        case success(ADD_REQUEST):
        case success(DELETE_REQUEST):
        case success(UPDATE_REQUEST):
            await next(getListTweets());
            break;
        case error(ADD_REQUEST):
        case error(DELETE_REQUEST):
        case error(UPDATE_REQUEST):
        case error(GETALL_REQUEST):
            next({
                type: SHOW_ERROR_MODAL,
                payload: {
                    message: action.error.message
                }
            });
            break;
        default:
            break;
    }
    return next(action);
};