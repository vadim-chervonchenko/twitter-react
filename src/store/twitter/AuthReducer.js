import './AuthActions';
import { requestsReducer } from 'redux-saga-requests';
import {
    REGISTER_REQUEST,
    LOGIN_REQUEST,
    USER_LOGOUT,
    SET_JWT_TOKEN
} from './AuthActions';

export const authReducer = requestsReducer({
    actionType: LOGIN_REQUEST,
    onSuccess: (state, action) => {

        localStorage.setItem('access_token', action.data.access_token);

        return {
            ...state.data, data: {...action.data}
        }
    },
    multiple: true,
    mutations: {
        [REGISTER_REQUEST]: {
            updateData : (state, action) => {
                return {
                    ...state, items: {...action.response.data}
                }
            }
        },
        [USER_LOGOUT]: {
            updateData: (state, action) => {
                return {
                    ...state.data, access_token: ''
                }
            }
        },
        [SET_JWT_TOKEN]: {
            updateData: (state, action) => {
                return {
                    ...state.data, access_token: action.access_token
                }
            },
            local: true
        }
    }
});