import {reducer as formReducer} from "redux-form";

import {authReducer} from './twitter/reducers/auth-reducer.js';
import {tweetReducer} from './twitter/reducers/tweet-reducer.js';

import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import axios from "axios/index";

const authTokenMiddleware = (store) => (next) => (action) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
    return next(action);
};

export default createStore(
    combineReducers({
        auth: authReducer,
        tweets: tweetReducer,
        form: formReducer,
    }), applyMiddleware(
        thunkMiddleware,
        authTokenMiddleware
    ));