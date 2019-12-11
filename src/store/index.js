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

const sagaMiddleware = createSagaMiddleware();

/* debug settings */
const composeEnhancers = (
    typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) || compose;

export default createStore(
    combineReducers({
        auth: authReducer,
        tweets: tweetReducer,
        errors: errorReducer
    }), composeEnhancers(applyMiddleware(
        thunkMiddleware,
        authMiddleware,
        setAxiosDefaults,
        tweetMiddleware,
        sagaMiddleware,
        requestsPromiseMiddleware()
    ))
);

sagaMiddleware.run(rootSaga, axiosInstance);
