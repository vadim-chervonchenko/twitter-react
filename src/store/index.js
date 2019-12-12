import axios from 'axios';

/* reducers */
import authReducer from './auth/authReducer';
import tweetReducer from './tweet/tweetReducer';
import errorReducer from './error/errorReducer';

/* middleware */
import thunkMiddleware from 'redux-thunk';
import {tweetMiddleware} from './tweet/tweetMiddleware';
import {setAxiosDefaults} from './auth/axiosDefaultsMiddleware';
import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import {authMiddleware} from './auth/authMiddleware';
import createSagaMiddleware from 'redux-saga';
import {requestsPromiseMiddleware} from 'redux-saga-requests';

/* sagas */
import {rootSaga} from './rootSaga.js';

const sagaMiddleware = createSagaMiddleware();
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

sagaMiddleware.run(rootSaga, axios);
