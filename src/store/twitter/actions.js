import axios from "axios/index";

import { userConstants, alertConstants, tweetConstants } from '../../constants/constants.js'

axios.defaults.baseURL = '/api/';
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;

export const getListTwets = () => {
    return (dispatch) => {
        return axios.get('tweets'
        ).then(res => {
            dispatch({
                type: tweetConstants.GETALL_REQUEST,
                payload: {
                    items: res.data,
                }
            });
        })
    };
};
export const addTweet = (content) => {
    return (dispatch) => {
        return axios.post('tweets',
            {
                label: content
            }
        ).then((response) => {
            dispatch({
                type: tweetConstants.ADD_REQUEST,
                payload: {
                    label: content,
                    id: response.data.id
                }
            });
        })
    }
};
export const delTweet = (id, state) => {
    return (dispatch) => {
        const idx = state.mainState.items.findIndex((item) => item.id === id);

        return axios.delete(`tweets/${id}`, {}).then(() => {
            dispatch({
                type: tweetConstants.DELETE_REQUEST,
                payload: {
                    id: idx
                }
            });
        }).catch((error) => {
            console.log(error);
        })
    }
};
export const updateTweet = (state, id, content) => {
    return (dispatch) => {
        const idx = state.findIndex((item) => item.id === id);
        const item = {...state[idx], label: content};

        return axios.put(
            `tweets/${id}`,
            {
                label: content
            },
        ).then(() => {
            dispatch({
                type: tweetConstants.UPDATE_REQUEST,
                payload: {
                    item: item,
                    id: idx
                }
            });
        })
    }
};
export const setSearchQuery = (searchQuery) => {
    return {
        type: tweetConstants.SEARCH_QUERY,
        payload: {
            searchQuery: searchQuery
        }
    }
};
export const registersUser = (formData) => {
    return (dispatch) => {
        return axios.post(
            `register/`,
            {
                email: formData.userEmail,
                name: formData.lastName,
                password: formData.userPassword
            }
        ).then((response) => {

            dispatch({
                type: userConstants.REGISTER_REQUEST,
                payload: {
                    user: response.user,
                    token: response.data.access_token
                }
            });
        })
    }
};
export const loginsUser = (formData) => {
    return (dispatch) => {
        return axios.post(
            `login/`,
            {
                email: formData.userEmail,
                password: formData.userPass
            }
        ).then((response) => {

            localStorage.setItem('access_token', response.data.access_token );

            dispatch({
                type: userConstants.LOGIN_REQUEST,
                payload: {
                    user: true
                }
            });
        })
    }
};