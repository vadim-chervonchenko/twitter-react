import {success} from "redux-saga-requests";
import {
	ADD_REQUEST,
	DELETE_REQUEST,
	UPDATE_REQUEST,
    getListTweets
} from "./TweetActions";

export const tweetMiddleware = ( {getState, dispatch} ) => ( next ) => async ( action ) => {
	switch ( action.type ) {
		case success( ADD_REQUEST ):
        case success( DELETE_REQUEST ):
        case success( UPDATE_REQUEST ):

            await dispatch(getListTweets());
			break;

		default:
			break;
	}
	return next( action );
};