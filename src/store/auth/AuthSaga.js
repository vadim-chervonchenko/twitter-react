import {createDriver} from "redux-saga-requests-axios";
import { all, put, takeLatest } from 'redux-saga/effects';
import {createRequestInstance, sendRequest, success, error} from "redux-saga-requests";
import { REGISTER_REQUEST, LOGIN_REQUEST, USER_LOGOUT, FETCH_USER_REQUEST } from './AuthActions';

//sagas and others login
function* loginRequestSuccess(action) {
    yield console.log('тип залогинился');
}
function* loginRequestError(action) {
    yield put({
        type: FETCH_USER_REQUEST,
        payload: '',
    });
}
//sagas and others register
function* registrationRequestSuccess(action) {
    yield console.log('тип зарегался');
}
function* registrationRequestError(action) {
    yield put({
        type: FETCH_USER_REQUEST,
        payload: '',
    });
}
//sagas and others logout
function* logout(action) {
    yield put({
        type: FETCH_USER_REQUEST,
        payload: '',
    });
}

/*// fetch user
function* fetchUserRequestSuccess(action) {
    yield put({
        type: FETCH_USER_REQUEST,
        payload: '',
    });
}
function* loginWithTokenAttemptDone(action) {
    yield put({
        type: FETCH_USER_REQUEST,
        payload: '',
    });
}*/

const AuthSaga = function* (axiosInstance) {
    yield createRequestInstance({
        driver: createDriver(axiosInstance)
    });

    yield all([
        takeLatest(LOGIN_REQUEST, sendRequest),
        takeLatest(success(LOGIN_REQUEST), loginRequestSuccess),
        takeLatest(error(LOGIN_REQUEST), loginRequestError),

        takeLatest(REGISTER_REQUEST, sendRequest),
        takeLatest(success(REGISTER_REQUEST), registrationRequestSuccess),
        takeLatest(error(REGISTER_REQUEST), registrationRequestError),

        /*takeLatest(FETCH_USER_REQUEST, sendRequest),
        takeLatest(success(FETCH_USER_REQUEST), fetchUserRequestSuccess),
        takeLatest(success(FETCH_USER_REQUEST), loginWithTokenAttemptDone),
        takeLatest(error(FETCH_USER_REQUEST), loginWithTokenAttemptDone),*/

        takeLatest(USER_LOGOUT, sendRequest),
        takeLatest(success(USER_LOGOUT), logout),
        takeLatest(error(USER_LOGOUT), logout),
    ]);
};

export default AuthSaga;