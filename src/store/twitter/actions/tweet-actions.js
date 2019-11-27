import axios from 'axios';

export const tweetConstants = {
	GETALL_REQUEST: 'TWEET_GETALL_REQUEST',
	GETALL_SUCCESS: 'TWEET_GETALL_SUCCESS',
	GETALL_FAILURE: 'TWEET_GETALL_FAILURE',

	ADD_REQUEST: 'TWEET_ADD_REQUEST',
	ADD_SUCCESS: 'TWEET_ADD_SUCCESS',
	ADD_FAILURE: 'TWEET_ADD_FAILURE',

	UPDATE_REQUEST: 'TWEET_UPDATE_REQUEST',
	UPDATE_SUCCESS: 'TWEET_UPDATE_SUCCESS',
	UPDATE_FAILURE: 'TWEET_UPDATE_FAILURE',

	DELETE_REQUEST: 'TWEET_DELETE_REQUEST',
	DELETE_SUCCESS: 'TWEET_DELETE_SUCCESS',
	DELETE_FAILURE: 'TWEET_DELETE_FAILURE',

	SEARCH_QUERY: 'SET_SEARCH_QUERY'
};

axios.defaults.baseURL = '/api/';

export const getListTwets = () => {
	return async ( dispatch ) => {
		try {
			/* loader and other */
			dispatch( {
				type: tweetConstants.GETALL_REQUEST,
				payload: {
					loading: true
				}
			} );

			const response = await axios.get( 'tweets' );

			dispatch( {
				type: tweetConstants.GETALL_SUCCESS,
				payload: {
					items: response.data,
					loading: false
				}
			} );
		} catch ( error ) {
			dispatch( {
				type: tweetConstants.GETALL_FAILURE,
				payload: {
					error
				}
			} );
		}
	};
};
export const addTweet = ( content ) => {
	return async ( dispatch ) => {
		try {
			/* loader and other */
			dispatch( {
				type: tweetConstants.ADD_REQUEST,
				payload: {
					loading: true
				}
			} );

			const response = await axios.post( 'tweets', {content} );

			dispatch( {
				type: tweetConstants.ADD_SUCCESS,
				payload: {
					content,
					id: response.data.id,
					loading: false
				}
			} )
		} catch ( error ) {
			dispatch( {
				type: tweetConstants.ADD_FAILURE,
				payload: {
					error
				}
			} );
		}
	}
};
export const delTweet = ( id, state ) => {
	return async ( dispatch ) => {
		try {
			const idx = state.tweets.items.findIndex( ( item ) => item.id === id );

			/* loader and other */
			dispatch( {
				type: tweetConstants.DELETE_REQUEST,
				payload: {
					loading: true
				}
			} );

			await axios.delete( `tweets/${id}`, {} );

			dispatch( {
				type: tweetConstants.DELETE_SUCCESS,
				payload: {
					id: idx,
					loading: false
				}
			} )
		} catch ( error ) {
			dispatch( {
				type: tweetConstants.DELETE_FAILURE,
				payload: {
					error
				}
			} );
		}
	}
};
export const updateTweet = ( state, id, content ) => {
	return async ( dispatch ) => {
		try {
			const idx = state.findIndex( ( item ) => item.id === id );
			const item = {...state[idx], content};

			/* loader and other */
			dispatch( {
				type: tweetConstants.UPDATE_REQUEST,
				payload: {
					loading: true
				}
			} );

			await axios.put( `tweets/${id}`, {content} );

			dispatch( {
				type: tweetConstants.UPDATE_SUCCESS,
				payload: {
					item,
					id: idx,
					loading: false
				}
			} );
		} catch ( error ) {
			dispatch( {
				type: tweetConstants.UPDATE_FAILURE,
				payload: {
					error
				}
			} );
		}
	}
};
export const setSearchQuery = ( searchQuery ) => {
	return {
		type: tweetConstants.SEARCH_QUERY,
		payload: {
			searchQuery: searchQuery
		}
	}
};