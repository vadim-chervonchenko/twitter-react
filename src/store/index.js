/* reducers */
import authReducer from './auth/AuthReducer';
import tweetReducer from './tweet/TweetReducer';
import errorReducer from './error/ErrorReducer';

import thunkMiddleware from "redux-thunk";
/* middleware */
import {setAxiosDefaults, authMiddleware, axiosInstance} from './auth/AuthMiddleware';
import {tweetMiddleware} from './tweet/TweetMiddleware';
import {applyMiddleware, combineReducers, compose, createStore} from 'redux';

import createSagaMiddleware from 'redux-saga';
import {requestsPromiseMiddleware} from 'redux-saga-requests';
import {rootSaga} from './RootSaga.js';

/* import-ы лучше будет разбить на отдельные группы */

const sagaMiddleware = createSagaMiddleware();

/* debug settings */
const composeEnhancers = (
    typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) || compose;

export default createStore(
    combineReducers({

        auth: authReducer,
        tweets: tweetReducer, /* твиты все таки оставим твитами, не будем переделывать на посты. */
        errors: errorReducer

    }), composeEnhancers(applyMiddleware(

        /* разобрарться с очередностью мидлваров, они следуют друг за другом , как в этом списке */
        thunkMiddleware,
        authMiddleware,
        setAxiosDefaults,
        tweetMiddleware,
        sagaMiddleware,
        requestsPromiseMiddleware()
    ))
);

sagaMiddleware.run(rootSaga, axiosInstance); // тут будем использовать обычный axios , по крайней мере пока.
