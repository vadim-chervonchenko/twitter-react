import './AuthActions';
import {success} from 'redux-saga-requests';
import {
    REGISTER_REQUEST,
    LOGIN_REQUEST,
    USER_LOGOUT,
    FETCH_USER,
    APP_INIT
} from './AuthActions';

const initialState = {
    user: {}
};

const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case success(REGISTER_REQUEST):
        case success(LOGIN_REQUEST):
            return {
                ...state,
                user: {
                    ...action.payload.data, ...state.user,
                }
            };
        case USER_LOGOUT:
            return {
                ...state, user: false
            };
        case APP_INIT:
            return {
                ...state, user: {...state.user, access_token: action.payload}
            };
        case success(FETCH_USER):
            return {
                ...state, user: {...state.user, ...action.payload.data}
            };
        default:
            return state;
    }
};

export default Reducer;