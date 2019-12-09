import axios from 'axios';
import {success, error} from 'redux-saga-requests';
import {
	REGISTER_REQUEST,
	LOGIN_REQUEST,
	SET_JWT_TOKEN,
    fetchUser,
    APP_INIT,
    appInit
} from './AuthActions';

export const axiosInstance = axios.create( {
	baseURL: '/api/',
});

export const authTokenMiddleware = (store) => (next) => (action) => {
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

export const authMiddleware = ({getState, dispatch}) => next => async action => {
    switch (action.type) {
        case success( REGISTER_REQUEST ):
        case success( LOGIN_REQUEST ):
            /* get user */
            await dispatch(fetchUser());
            break;
        case error( REGISTER_REQUEST ):
        case error( LOGIN_REQUEST ):
            break;
        default:
            break;
    }
    return next(action);
};
