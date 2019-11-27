import axios from 'axios';

export const tweetConstants = {
    GETALL_REQUEST: 'TWEET_GETALL_REQUEST',
    GETALL_SUCCESS: 'TWEET_GETALL_SUCCESS',
    GETALL_FAILURE: 'TWEET_GETALL_FAILURE',

    ADD_REQUEST: 'TWEET_ADD_REQUEST',
    ADD_SUCCESS: 'TWEET_ADD_SUCCESS',
    ADD_FAILURE: 'TWEET_ADD_FAILURE',

    UPDATE_REQUEST: 'TWEET_UPDATE_REQUEST',
    UPDATE_SUCCESS: 'TWEET_UPDATE_SUCCESS',
    UPDATE_FAILURE: 'TWEET_UPDATE_FAILURE',

    DELETE_REQUEST: 'TWEET_DELETE_REQUEST',
    DELETE_SUCCESS: 'TWEET_DELETE_SUCCESS',
    DELETE_FAILURE: 'TWEET_DELETE_FAILURE',

    SEARCH_QUERY: 'SET_SEARCH_QUERY'
};

axios.defaults.baseURL = '/api/';

export const getListTwets = () => {
    return (dispatch) => {

        /* loader and other */
        dispatch({
            type: tweetConstants.GETALL_REQUEST,
            payload: {
                loading: true
            }
        });

        return axios
            .get('tweets')
            .then(res => {
                dispatch({
                    type: tweetConstants.GETALL_SUCCESS,
                    payload: {
                        items: res.data,
                        loading: false
                    }
                });

            }).catch((error) => {

                /* ошибка */
                dispatch({
                    type: tweetConstants.GETALL_FAILURE,
                    payload: {
                        error
                    }
                });

            });
    };
};
export const addTweet = (content) => {
    return (dispatch) => {

        /* loader and other */
        dispatch({
            type: tweetConstants.ADD_REQUEST,
            payload: {
                loading: true
            }
        });

        return axios
            .post('tweets', {label: content})
            .then((response) => {

                dispatch({
                    type: tweetConstants.ADD_SUCCESS,
                    payload: {
                        label: content,
                        id: response.data.id,
                        loading: false
                    }
                })

            }).catch((error) => {

                /* ошибка */
                dispatch({
                    type: tweetConstants.ADD_FAILURE,
                    payload: {
                        error
                    }
                });

            })
    }
};
export const delTweet = (id, state) => {
    return (dispatch) => {

        const idx = state.tweets.items.findIndex((item) => item.id === id); // эт еще не понятно куда, или здесь или куда-то еще запихнуть

        /* loader and other */
        dispatch({
            type: tweetConstants.DELETE_REQUEST,
            payload: {
                loading: true
            }
        });

        return axios
            .delete(`tweets/${id}`, {})
            .then(() => {

                dispatch({
                    type: tweetConstants.DELETE_SUCCESS,
                    payload: {
                        id: idx,
                        loading: false
                    }
                });

            }).catch((error) => {

                /* ошибка */
                dispatch({
                    type: tweetConstants.DELETE_FAILURE,
                    payload: {
                        error
                    }
                });

            })
    }
};
export const updateTweet = (state, id, content) => {
    return (dispatch) => {

        const idx = state.findIndex((item) => item.id === id);
        const item = {...state[idx], label: content};

        /* loader and other */
        dispatch({
            type: tweetConstants.UPDATE_REQUEST,
            payload: {
                loading: true
            }
        });

        return axios
            .put(`tweets/${id}`, {label: content})
            .then(() => {

                dispatch({
                    type: tweetConstants.UPDATE_SUCCESS,
                    payload: {
                        item: item,
                        id: idx,
                        loading: false
                    }
                });

            }).catch((error) => {

                /* ошибка */
                dispatch({
                    type: tweetConstants.UPDATE_FAILURE,
                    payload: {
                        error
                    }
                });

            });
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