import './authActions';
import {success} from 'redux-saga-requests';
import {
    REGISTER,
    LOGIN,
    LOGOUT,
    FETCH_USER,
    APP_INIT
} from './authActions';

const initialState = {
    user: {},
    isAuthorized: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case success(REGISTER):
        case success(LOGIN):
            return {
                user: action.payload.data
            };
        case LOGOUT:
            return {
                ...initialState
            };
        case APP_INIT:
            return {
                ...initialState
            };
        case success(FETCH_USER):
            return {
                user: action.payload.data,
                isAuthorized: true
            };
        default:
            return state;
    }
};