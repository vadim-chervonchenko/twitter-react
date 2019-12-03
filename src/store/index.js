import {reducer as formReducer} from "redux-form";
import {authReducer} from './twitter/AuthReducer.js';
import {tweetReducer} from './twitter/TweetReducer.js';
import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import axios from "axios/index";
import createSagaMiddleware from 'redux-saga';
import {rootSaga} from './twitter/AuthSaga.js';

const sagaMiddleware = createSagaMiddleware();

const authTokenMiddleware = (store) => (next) => (action) => {

    if ( action.type === 'USERS_LOGOUT' ) {
        console.log(axiosInstance.defaults.headers);
    }

    if ( action.type === 'USERS_LOGIN_REQUEST_SUCCESS' ){
        console.log(action.data);
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${action.data.access_token}`;
        console.log( axiosInstance.defaults.headers);

    }
    return next(action);
};

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export default createStore(
    combineReducers({
        auth: authReducer,
        tweets: tweetReducer,
        form: formReducer,
    }), composeEnhancers(applyMiddleware(
        authTokenMiddleware,
        sagaMiddleware
    )));

/*sagaMiddleware.run(AllAuthSaga);*/

const axiosInstance = axios.create({
    baseURL: '/api/'
});

sagaMiddleware.run(rootSaga, axiosInstance);
