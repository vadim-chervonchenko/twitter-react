import {takeEvery, spawn, all, put, call} from 'redux-saga/effects';
import axios from 'axios';
import './TweetActions';
import {GETALL_REQUEST, ADD_REQUEST, DELETE_REQUEST, UPDATE_REQUEST} from "./TweetActions";

export const GETALL_SUCCESS = 'TWEET_GETALL_SUCCESS';
export const GETALL_FAILURE = 'TWEET_GETALL_FAILURE';

function* getListTwets() {
    try {
        const {data} = yield call(axios.get, `tweets`);

        yield put({
            type: GETALL_SUCCESS,
            payload: {
                items: data
            }
        });
    } catch (error) {
        yield put({
            type: GETALL_FAILURE,
            payload: {
                error
            }
        });
    }
}

export const ADD_SUCCESS = 'TWEET_ADD_SUCCESS';
export const ADD_FAILURE = 'TWEET_ADD_FAILURE';

function* addTweet({payload: {content}}) {
    try {
        const {data: item} = yield call(axios.post, 'tweets', {content});

        yield put({
            type: ADD_SUCCESS,
            payload: {
                item
            }
        });
    } catch (error) {
        yield put({
            type: ADD_FAILURE,
            payload: {
                error
            }
        });
    }
}

export const DELETE_SUCCESS = 'TWEET_DELETE_SUCCESS';
export const DELETE_FAILURE = 'TWEET_DELETE_FAILURE';

function* delTweet({payload: {id}}) {
    try {
        yield call(axios.delete, `tweets/${id}`, {});

        yield put({
            type: DELETE_SUCCESS,
            payload: {
                id
            }
        });

    } catch (error) {
        yield put({
            type: DELETE_FAILURE,
            payload: {
                error
            }
        });
    }
}

export const UPDATE_SUCCESS = 'TWEET_UPDATE_SUCCESS';
export const UPDATE_FAILURE = 'TWEET_UPDATE_FAILURE';

function* updateTweet({payload: {id, content}}) {
    try {
        const {data: {updated_at}} = yield call(axios.put, `tweets/${id}`, {content});

        console.log(updated_at);

        yield put({
            type: UPDATE_SUCCESS,
            payload: {
                id,
                content,
                updated_at
            }
        });
    } catch (error) {
        yield put({
            type: UPDATE_FAILURE,
            payload: {
                error
            }
        });
    }
}

function* watchGetListTwets() {
    yield takeEvery(GETALL_REQUEST, getListTwets);
}

function* watchAddTweet() {
    yield takeEvery(ADD_REQUEST, addTweet);
}

function* watchDelTweet() {
    yield takeEvery(DELETE_REQUEST, delTweet);
}

function* watchUpdateTweet() {
    yield takeEvery(UPDATE_REQUEST, updateTweet);
}

export const AllTweetSaga = function* () {
    yield all([
        spawn(watchGetListTwets),
        spawn(watchAddTweet),
        spawn(watchDelTweet),
        spawn(watchUpdateTweet),
    ]);
};