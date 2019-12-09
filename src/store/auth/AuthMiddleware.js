import axios from 'axios';
import {success} from 'redux-saga-requests';
import {
	REGISTER_REQUEST,
	LOGIN_REQUEST,
	SET_JWT_TOKEN
} from './AuthActions';

export const axiosInstance = axios.create( {
	baseURL: '/api/',
});

export const authTokenMiddleware = ( {getState, dispatch} ) => ( next ) => ( action ) => {
	switch ( action.type ) {
		case success( REGISTER_REQUEST ):
		case success( LOGIN_REQUEST ):
			axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${action.data.access_token}`;
			break;
		case SET_JWT_TOKEN:
			axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem( 'access_token' )}`;
			action.access_token = localStorage.getItem( 'access_token' );
			break;
		default:
			break;
	}
	return next( action );
};

export const authMiddleware = ( {getState, dispatch} ) => next => async action => {
	return next( action );
};

/*
export const authMiddleware = ({ getState, dispatch }) => next => async action => {
	switch (action.type) {
		case SOME_ACTION:
			const asyncResult = await somethingAsync();
			dispatch(anotherAction(asyncResult));
			break;
		case SOME_OTHER_ACTION:
			const { slice: { stateVariable } } = getState();
			await someProcess(stateVariable);
			break;
		default:
			break;
	}
	return next(action);
};*/
