import './AuthActions';
import {success, error} from 'redux-saga-requests';
import {
	REGISTER_REQUEST,
	LOGIN_REQUEST,
	USER_LOGOUT,
	SET_JWT_TOKEN,
    FETCH_USER
} from './AuthActions';

const initialState = {
    user: {
        name: '',
        access_token: ''
    },
    pending: false,
    errors: ''
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
            return {
                ...state,
                pending: true
            };
        case success(REGISTER_REQUEST):
        case success(LOGIN_REQUEST):
            localStorage.setItem( 'access_token', action.data.access_token );
            return {
                ...state,
                pending: false,
                user: {
                    ...action.data, ...state.user,
                }
            };
        case error(REGISTER_REQUEST):
        case error(LOGIN_REQUEST):
            return {
                errors: 'Something went wrong'
            };
        case USER_LOGOUT:
            return {
                ...state, user: false
            };
        case SET_JWT_TOKEN:
            return {
                ...state, user: { ...state.user, access_token: action.access_token }
            };
        case success(FETCH_USER):
            return {
                ...state, user: { ...action.data }
            };
        default:
            return state;
    }
};