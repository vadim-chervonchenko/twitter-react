import './AuthActions';
import {
    REGISTER_REQUEST,
    LOGIN_REQUEST,
    LOGOUT
} from './AuthActions';
import {
    REGISTER_SUCCESS,
    LOGIN_SUCCESS,
    REGISTER_FAILURE,
    LOGIN_FAILURE,
} from './AuthSaga';

const initialState = {
    user: {
        name: 'admin',
        token: ''
    },
    loading: false,
    errors: ''
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
            return {
                ...state,
                loading: true
            };
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                user: {
                    token: action.payload.token
                }
            };
        case REGISTER_FAILURE:
            return {
                errors: 'register_failure'
            };
        case LOGIN_FAILURE:
            return {
                errors: 'login_failure'
            };
        case LOGOUT:
            return {
                user: false
            };
        default:
            return state;
    }
};
