import './AuthActions';
import { requestsReducer } from 'redux-saga-requests';

import {
    REGISTER_REQUEST,
    LOGIN_REQUEST,
    USER_LOGOUT
} from './AuthActions';

export const authReducer = requestsReducer({
    actionType: LOGIN_REQUEST,
    multiple: true,
    mutations: {
        [REGISTER_REQUEST]: {
            updateData : (state, action) => {

                console.log(state);

                return {
                    ...state.data, ...action.response.data
                }
            }
        },
        [USER_LOGOUT] : (state, action) => {
            return [];
        }
    }
});