import './authActions';
import {success} from 'redux-saga-requests';
import {
    LOGOUT,
    FETCH_USER
} from './authActions';

const initialState = {
    user: {},
    isAuthorized: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGOUT:
            return {
                ...initialState
            };
        case success(FETCH_USER):
            return {
                ...state,
                user: action.payload.data,
                isAuthorized: true
            };
        default:
            return state;
    }
};