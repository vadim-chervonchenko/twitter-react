import axios from 'axios';
import {success, error} from 'redux-saga-requests';

import {
    REGISTER_REQUEST,
    LOGIN_REQUEST,
    SET_AUTH_HEADER,
    DELETE_AUTH_HEADER,
    fetchUser,
    setAuthHeader
} from './AuthActions';
import {SHOW_ERROR_MODAL} from '../error/ErrorReducer';

export const axiosInstance = axios.create({
    baseURL: '/api/',
});

/* стоит ли выносить отдельно , пока не понятно */
export const setAxiosDefaults = (store) => (next) => (action) => {
    switch (action.type) {
        case SET_AUTH_HEADER:
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${action.payload}`;
            break;
        case DELETE_AUTH_HEADER:
            delete axiosInstance.defaults.headers.common['Authorization'];
            break;
        default:
            axiosInstance.defaults.baseURL = 'http://127.0.0.1:8000/api/'; /* вынести в отдельный конфиг */
            break;
    }
    return next(action)
};

export const authMiddleware = (store) => next => async action => {
    switch (action.type) {

        /* экшны конечно по дерьмовому называются */
        case success(REGISTER_REQUEST):
        case success(LOGIN_REQUEST):
            localStorage.setItem('access_token', action.payload.data.access_token);
            next(setAuthHeader(action.payload.data.access_token));
            await next(fetchUser());
            break;
        case error(REGISTER_REQUEST):
        case error(LOGIN_REQUEST):
            next({
                type: SHOW_ERROR_MODAL,
                payload: {
                    message: action.error.message
                }
            });
            break;
        default:
            break;
    }
    return next(action);
};
