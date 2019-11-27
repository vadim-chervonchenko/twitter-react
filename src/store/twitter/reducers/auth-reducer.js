export const userConstants = {
    REGISTER_REQUEST: 'USERS_REGISTER_REQUEST',
    REGISTER_SUCCESS: 'USERS_REGISTER_SUCCESS',
    REGISTER_FAILURE: 'USERS_REGISTER_FAILURE',

    LOGIN_REQUEST: 'USERS_LOGIN_REQUEST',
    LOGIN_SUCCESS: 'USERS_LOGIN_SUCCESS',
    LOGIN_FAILURE: 'USERS_LOGIN_FAILURE',

    LOGOUT: 'USERS_LOGOUT',

    GETALL_REQUEST: 'USERS_GETALL_REQUEST',
    GETALL_SUCCESS: 'USERS_GETALL_SUCCESS',
    GETALL_FAILURE: 'USERS_GETALL_FAILURE'
};

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
