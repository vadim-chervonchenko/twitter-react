import axios from "axios/index";
import store from '../index'; // тут не понятно можно ли так делать или нет, и нужно разобратсья можно ли вообще так делать или нет

import { userConstants, alertConstants, tweetConstants } from '../../constants/constants.js'

axios.defaults.baseURL = '/api/';

console.log(store.getState().mainState.token);
console.log(axios.defaults.headers.common['Authorization']);
axios.defaults.headers.common['Authorization'] = 'bla bla bla';

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

    console.log(store.getState().mainState.token);
    console.log(axios.defaults.headers.common);

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

            /* если все ок , тут можно чувака сразу логинить, важно только диспатчить нужное событие, типа зарегал чувака
            *
            * сразу нужно записать токен и использовать его при последующих запросах.
            *
            * */

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

            /*
             * если получаем токен, то записываем его в state. для конкретного пользователя, типа пользователь - token
             * и потом во всех последующих операциях делаем запрос с этим токеном.
              *
              *
              *
              * */

            dispatch({
                type: userConstants.LOGIN_REQUEST,
                payload: {
                    user: true,
                    token: response.data.access_token
                }
            });
        })
    }
};