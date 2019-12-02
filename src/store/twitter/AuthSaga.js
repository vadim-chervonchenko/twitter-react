import {takeEvery, spawn, all, put, call} from 'redux-saga/effects';
import axios from 'axios';
import { LOGIN_REQUEST, REGISTER_REQUEST } from "./AuthActions";

export const REGISTER_SUCCESS = 'USERS_REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'USERS_REGISTER_FAILURE';
function* registerUser({payload: {userEmail, lastName, userPassword}}) {
    try {
        const {data: access_token, user} = yield call(axios.post, `register/`,
            {
                email: userEmail,
                name: lastName,
                password: userPassword
            }
        );

        localStorage.setItem('access_token', access_token);

        yield  put({
            type: REGISTER_SUCCESS,
            payload: {
                user,
                token: access_token,
                loading: false
            }
        });
    } catch (error) {
        yield put({
            type: REGISTER_FAILURE,
            payload: {
                error
            }
        });
    }
}
export const LOGIN_SUCCESS = 'USERS_LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'USERS_LOGIN_FAILURE';
function* loginUser({payload: {userEmail, userPass}}) {
    try {
        const {data: {access_token, error}} = yield call(axios.post, `login/`,
            {
                email: userEmail,
                password: userPass
            }
        );

        if (!error) {
            localStorage.setItem('access_token', access_token);
        }

        yield put({
            type: LOGIN_SUCCESS,
            payload: {
                loading: false,
                token: access_token
            }
        });

    } catch (error) {
        yield  put({
            type: LOGIN_FAILURE,
            payload: {
                error
            }
        });
    }
}
function* watchUserLogin() {
    yield takeEvery(LOGIN_REQUEST, loginUser);
}
function* watchUserRegister() {
    yield takeEvery(REGISTER_REQUEST, registerUser);
}
export const AllAuthSaga = function* () {
    yield all([
        spawn(watchUserLogin),
        spawn(watchUserRegister),
    ]);
};