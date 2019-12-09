/* reducers */
import {reducer as formReducer} from "redux-form";
import {authReducer} from './auth/AuthReducer.js';
import {tweetReducer} from './tweet/TweetReducer.js';

/* middleware */
import {authTokenMiddleware, authMiddleware, axiosInstance} from './auth/AuthMiddleware';
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
	combineReducers( {
		auth: authReducer,
		tweets: tweetReducer,
		form: formReducer,
	}), composeEnhancers( applyMiddleware(
		authTokenMiddleware,
		authMiddleware,
		tweetMiddleware,
		sagaMiddleware,
		requestsPromiseMiddleware( {
			auto: true
		})
	))
);

sagaMiddleware.run( rootSaga, axiosInstance );
