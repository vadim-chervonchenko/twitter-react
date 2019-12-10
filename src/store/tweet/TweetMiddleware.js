import {success, error} from "redux-saga-requests";
import {
    ADD_REQUEST,
    DELETE_REQUEST,
    UPDATE_REQUEST,
    GETALL_REQUEST,
    getListTweets
} from './TweetActions';
import {SHOW_ERROR_MODAL} from '../error/ErrorActions';

export const tweetMiddleware = ({getState, dispatch}) => (next) => async (action) => {
    switch (action.type) {
        case success(ADD_REQUEST):
        case success(DELETE_REQUEST):
        case success(UPDATE_REQUEST):
            await dispatch(getListTweets());
            break;
        case error(ADD_REQUEST):
        case error(DELETE_REQUEST):
        case error(UPDATE_REQUEST):
        case error(GETALL_REQUEST):
            dispatch({
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