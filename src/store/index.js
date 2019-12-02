import {reducer as formReducer} from "redux-form";

import {authReducer} from './twitter/AuthReducer.js';
import {tweetReducer} from './twitter/TweetReducer.js';

import {applyMiddleware, combineReducers, createStore} from 'redux';
import axios from "axios/index";

import createSagaMiddleware from 'redux-saga';

import {AllAuthSaga} from './twitter/AuthSaga.js';
import {AllTweetSaga} from './twitter/TweetSaga.js';

const sagaMiddleware = createSagaMiddleware();

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
        authTokenMiddleware,
        sagaMiddleware
    ));

sagaMiddleware.run(AllAuthSaga);
sagaMiddleware.run(AllTweetSaga);
