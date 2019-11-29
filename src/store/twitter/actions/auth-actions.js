import axios from 'axios';
import {userConstants} from '../../../types/constants.js';

axios.defaults.baseURL = '/api/';

export const registersUser = (payload) => ({
    type: userConstants.REGISTER_REQUEST,
    payload
});

export const loginsUser = (payload) => ({
    type: userConstants.LOGIN_REQUEST,
    payload
});

export const logOut = () => ({
    type: userConstants.LOGOUT
});