import {userConstants} from '../../../types/constants.js';

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
        case userConstants.REGISTER_REQUEST:
        case userConstants.LOGIN_REQUEST:
            return {
                ...state,
                loading: true
            };
        case userConstants.REGISTER_SUCCESS:
        case userConstants.LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                user: {
                    token: action.payload.token
                }
            };
        case userConstants.REGISTER_FAILURE:
            return {
                errors: 'register_failure'
            };
        case userConstants.LOGIN_FAILURE:
            return {
                errors: 'login_failure'
            };
        case userConstants.LOGOUT:
            return {
                user: false
            };
        default:
            return state;
    }
};
