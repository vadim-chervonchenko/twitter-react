import {takeEvery, spawn, all, put, call} from 'redux-saga/effects';
import axios from 'axios';
import {userConstants} from '../../../types/constants.js';

function* registerUser({payload: {userEmail, lastName, userPassword}}) {
    try {
        const {data: access_token, user} = yield call(axios.post, `register/`,
            {
                email: userEmail,
                name: lastName,
                password: userPassword
            }
        );

        localStorage.setItem('access_token', access_token); // тут подумать как лучше сделтаь ( мидлвары и прочую срань разобрать )

        yield  put({
            type: userConstants.REGISTER_SUCCESS,
            payload: {
                user,
                token: access_token,
                loading: false
            }
        });
    } catch (error) {
        yield put({
            type: userConstants.REGISTER_FAILURE,
            payload: {
                error
            }
        });
    }
}

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
            type: userConstants.LOGIN_SUCCESS,
            payload: {
                loading: false,
                token: access_token
            }
        });

    } catch (error) {
        yield  put({
            type: userConstants.LOGIN_FAILURE,
            payload: {
                error
            }
        });
    }
}

function* watchUserLogin() {
    yield takeEvery(userConstants.LOGIN_REQUEST, loginUser);
}

function* watchUserRegister() {
    yield takeEvery(userConstants.REGISTER_REQUEST, registerUser);
}

export const AllAuthSaga = function* () {
    yield all([
        spawn(watchUserLogin),
        spawn(watchUserRegister),
    ]);
};