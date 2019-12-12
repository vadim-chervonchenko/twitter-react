import axios from 'axios';
import {
    DELETE_AUTH_HEADER,
    SET_AUTH_HEADER
} from "./authActions";
import {AXIOS_DEFAULT_BASE_URL} from '../../configs/axios.config';

export const setAxiosDefaults = (store) => (next) => (action) => {
    switch (action.type) {
        case SET_AUTH_HEADER:
            axios.defaults.headers.common['Authorization'] = `Bearer ${action.payload}`;
            break;
        case DELETE_AUTH_HEADER:
            delete axios.defaults.headers.common['Authorization'];
            break;
        default:
            axios.defaults.baseURL = AXIOS_DEFAULT_BASE_URL;
            break;
    }
    return next(action)
};