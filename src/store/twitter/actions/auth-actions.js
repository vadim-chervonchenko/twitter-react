import axios from 'axios';

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

axios.defaults.baseURL = '/api/';

export const registersUser = (formData) => {
    return (dispatch) => {

        /* loader and other */
        dispatch({
            type: userConstants.REGISTER_REQUEST,
            payload: {
                loading: true
            }
        });

        return axios
            .post(
                `register/`,
                {
                    email: formData.userEmail,
                    name: formData.lastName,
                    password: formData.userPassword
                })
            .then((response) => {

                localStorage.setItem('access_token', response.data.access_token);

                dispatch({
                    type: userConstants.REGISTER_SUCCESS,
                    payload: {
                        user: response.user,
                        token: response.data.access_token,
                        loading: false
                    }
                });

            })
            .catch((error) => {

                /* ошибка */
                dispatch({
                    type: userConstants.REGISTER_FAILURE,
                    payload: {
                        error
                    }
                });

            })
    }
};
export const loginsUser = (formData) => {
    return (dispatch) => {

        /* loader and other */
        dispatch({
            type: userConstants.LOGIN_REQUEST,
            payload: {
                loading: true
            }
        });

        return axios
            .post(
                `login/`,
                {
                    email: formData.userEmail,
                    password: formData.userPass
                }
            )
            .then((response) => {

                localStorage.setItem('access_token', response.data.access_token); // это еще тоже не понятно, что и куда это пихать и где обрабатывать.

                dispatch({
                    type: userConstants.LOGIN_SUCCESS,
                    payload: {
                        loading: false,
                        token: response.data.access_token
                    }
                });

            }).catch((error) => {

                /* ошибка */
                dispatch({
                    type: userConstants.LOGIN_FAILURE,
                    payload: {
                        error
                    }
                });

            })
    }
};

export const logOut = () => {
    return {
        type: userConstants.LOGOUT,
        payload: {
            user: false
        }
    }
};