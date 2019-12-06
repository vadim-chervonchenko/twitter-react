import {createDriver} from "redux-saga-requests-axios";
import { all, put, takeLatest } from 'redux-saga/effects';
import {createRequestInstance, sendRequest, success, error} from "redux-saga-requests";
import { GETALL_REQUEST, ADD_REQUEST, UPDATE_REQUEST, DELETE_REQUEST, SEARCH_QUERY } from './TweetActions';
import {FETCH_USER_REQUEST} from "../auth/AuthActions";

// get all posts
function* getAllUserRequestSuccess() {
    yield put({
        type: FETCH_USER_REQUEST,
        payload: '',
    });
}
function* getAllUserRequestError() {
    yield put({
        type: FETCH_USER_REQUEST,
        payload: '',
    });
}
//add post
function* addPostRequestSuccess() {
    yield put({
        type: FETCH_USER_REQUEST,
        payload: '',
    });
}
function* addPostRequestError() {
    yield put({
        type: FETCH_USER_REQUEST,
        payload: '',
    });
}
//update post
function* updatePostRequestSuccess() {
    yield put({
        type: FETCH_USER_REQUEST,
        payload: '',
    });
}
function* updatePostRequestError() {
    yield put({
        type: FETCH_USER_REQUEST,
        payload: '',
    });
}
//delete post
function* deletePostRequestSuccess() {
    yield put({
        type: FETCH_USER_REQUEST,
        payload: '',
    });
}
function* deletePostRequestError() {
    yield put({
        type: FETCH_USER_REQUEST,
        payload: '',
    });
}
//set search query
function* searchPostRequestSuccess() {
    yield put({
        type: FETCH_USER_REQUEST,
        payload: '',
    });
}
function* searchPostRequestErrors() {
    yield put({
        type: FETCH_USER_REQUEST,
        payload: '',
    });
}

const TweetSaga = function* (axiosInstance) {
    yield createRequestInstance({
        driver: createDriver(axiosInstance)
    });

    yield all([
        takeLatest(GETALL_REQUEST, sendRequest),
        takeLatest(success(GETALL_REQUEST), getAllUserRequestSuccess),
        takeLatest(error(GETALL_REQUEST), getAllUserRequestError),

        takeLatest(ADD_REQUEST, sendRequest),
        takeLatest(success(ADD_REQUEST), addPostRequestSuccess),
        takeLatest(error(ADD_REQUEST), addPostRequestError),

        takeLatest(UPDATE_REQUEST, sendRequest),
        takeLatest(success(UPDATE_REQUEST), updatePostRequestSuccess),
        takeLatest(error(UPDATE_REQUEST), updatePostRequestError),

        takeLatest(DELETE_REQUEST, sendRequest),
        takeLatest(success(DELETE_REQUEST), deletePostRequestSuccess),
        takeLatest(error(DELETE_REQUEST), deletePostRequestError),

        takeLatest(SEARCH_QUERY, sendRequest),
        takeLatest(success(SEARCH_QUERY), searchPostRequestSuccess),
        takeLatest(error(SEARCH_QUERY), searchPostRequestErrors),
    ]);
};

export default TweetSaga;