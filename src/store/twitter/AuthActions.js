import axios from 'axios';

axios.defaults.baseURL = '/api/';

export const REGISTER_REQUEST = 'USERS_REGISTER_REQUEST';
export const registerUser = (payload) => ({
    type: REGISTER_REQUEST,
    payload
});
export const LOGIN_REQUEST = 'USERS_LOGIN_REQUEST';
export const loginUser = (payload) => {
    return {
        type: LOGIN_REQUEST,
        payload
    }
};
export const LOGOUT = 'USERS_LOGOUT';
export const logOut = () => ({
    type: LOGOUT
});