import {success} from "redux-saga-requests";
import {
	GETALL_REQUEST,
	ADD_REQUEST,
	DELETE_REQUEST,
	UPDATE_REQUEST,
	SEARCH_QUERY
} from "./TweetActions";

export const tweetMiddleware = ( {getState, dispatch} ) => ( next ) => ( action ) => {
	switch ( action.type ) {
		case success( GETALL_REQUEST ):
			break;
		case success( ADD_REQUEST ):
			break;
		case success( DELETE_REQUEST ):
			break;
		case success( UPDATE_REQUEST ):
			break;
		case success( SEARCH_QUERY ):
			break;
		default:
			break;
	}
	return next( action );
};