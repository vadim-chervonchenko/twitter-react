import './AuthActions';
import {success} from 'redux-saga-requests';
import {
    REGISTER_REQUEST,
    LOGIN_REQUEST,
    USER_LOGOUT,
    SET_JWT_TOKEN,
    FETCH_USER
} from './AuthActions';

const initialState = {
    user: {}
};

const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case success(REGISTER_REQUEST):
        case success(LOGIN_REQUEST):

            localStorage.setItem('access_token', action.data.access_token);

            return {
                ...state,
                user: {
                    ...action.data, ...state.user,
                }
            };
        case USER_LOGOUT:
            return {
                ...state, user: false
            };
        case SET_JWT_TOKEN:
            return {
                ...state, user: {...state.user, access_token: action.access_token}
            };
        case success(FETCH_USER):
            return {
                ...state, user: {...action.data}
            };
        default:
            return state;
    }
};

export default Reducer;