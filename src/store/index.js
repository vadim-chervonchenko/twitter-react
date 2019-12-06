import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import axios from "axios/index";
import createSagaMiddleware from 'redux-saga';
import {reducer as formReducer} from "redux-form";

//reducers
import {authReducer} from './auth/AuthReducer.js';
import {tweetReducer} from './posts/TweetReducer.js';

//sagas
import TweetSaga from './posts/TweetSaga';
import AuthSaga from './auth/AuthSaga';

//middleware
import { authTokenMiddleware, authMiddleware } from './auth/AuthMiddleware';
import { tweetMiddleware } from './posts/TweetMiddleware';

const sagaMiddleware = createSagaMiddleware();

//debug
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

// create store
export default createStore(
	combineReducers({
		auth: authReducer,
		tweets: tweetReducer,
		form: formReducer,
	}), composeEnhancers( applyMiddleware(
		authTokenMiddleware,
		sagaMiddleware,
        authMiddleware,
        tweetMiddleware
	))
);

// import from somewhere
const axiosInstance = axios.create({
	baseURL: '/api/',
});

sagaMiddleware.run(TweetSaga, axiosInstance);
sagaMiddleware.run(AuthSaga, axiosInstance);
