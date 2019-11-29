import {takeEvery, spawn, all, put, call} from 'redux-saga/effects';
import axios from 'axios';
import {tweetConstants} from '../../../types/constants.js';

function* getListTwets() {
    try {
        const {data} = yield call(axios.get, `tweets`);

        yield put({
            type: tweetConstants.GETALL_SUCCESS,
            payload: {
                items: data,
                loading: false
            }
        });
    } catch (error) {
        yield put({
            type: tweetConstants.GETALL_FAILURE,
            payload: {
                error
            }
        });
    }
}

function* addTweet({payload: {content}}) {
    try {
        const {data: {id}} = yield call(axios.post, 'tweets', {content});
        yield put({
            type: tweetConstants.ADD_SUCCESS,
            payload: {
                content,
                id,
                loading: false
            }
        });
    } catch (error) {
        yield put({
            type: tweetConstants.ADD_FAILURE,
            payload: {
                error
            }
        });
    }
}

function* delTweet({payload: {id, state}}) {
    try {
        const idx = state.tweets.items.findIndex((item) => item.id === id);
        yield call(axios.delete, `tweets/${id}`, {});

        yield put({
            type: tweetConstants.DELETE_SUCCESS,
            payload: {
                id: idx,
                loading: false
            }
        })
    } catch (error) {
        yield put({
            type: tweetConstants.DELETE_FAILURE,
            payload: {
                error
            }
        });
    }
}

function* updateTweet({payload: {state, id, content}}) {
    try {
        const idx = state.findIndex((item) => item.id === id);
        const item = {...state[idx], content};

        yield call(axios.put, `tweets/${id}`, {content});

        yield put({
            type: tweetConstants.UPDATE_SUCCESS,
            payload: {
                item,
                id: idx,
                loading: false
            }
        });

    } catch (error) {
        yield put({
            type: tweetConstants.UPDATE_FAILURE,
            payload: {
                error
            }
        });
    }
}

function* watchGetListTwets() {
    yield takeEvery(tweetConstants.GETALL_REQUEST, getListTwets);
}

function* watchAddTweet() {
    yield takeEvery(tweetConstants.ADD_REQUEST, addTweet);
}

function* watchDelTweet() {
    yield takeEvery(tweetConstants.DELETE_REQUEST, delTweet);
}

function* watchUpdateTweet() {
    yield takeEvery(tweetConstants.UPDATE_REQUEST, updateTweet);
}

export const AllTweetSaga = function* () {
    yield all([
        spawn(watchGetListTwets),
        spawn(watchAddTweet),
        spawn(watchDelTweet),
        spawn(watchUpdateTweet),
    ]);
};