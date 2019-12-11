import './AuthActions';
import {success} from 'redux-saga-requests';
import {
    REGISTER_REQUEST,
    LOGIN_REQUEST,
    USER_LOGOUT,
    FETCH_USER,
    APP_INIT
} from './AuthActions';

const initialState = {
    isAuthorized: false, // это будем включать только , если пользователь авторизирован.
    user: {}
};



/* пересмотреть значение и initialState null == {} или initialState , разобраться , зачем вообще токен в state, а то как то не понятно на первый взгляд, че где и как.
*
* тем самым получиться сократить редьюсер и часть логики с фронта уберется. Разобраться как скрывать с фронта какой то контент, при помощи флагов авторизации
*  с app_init немного не понятно , нужен ли он и куда лучше его запердолить.
*
*  Доработать initialState.
* */
const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case success(REGISTER_REQUEST):
        case success(LOGIN_REQUEST):
            return {
                ...state,
                user: {
                    ...action.payload.data, ...state.user,
                }
            };
        case USER_LOGOUT:
            return {
                ...state, user: false
            };
        case APP_INIT:
            return {
                ...state, user: {...state.user, access_token: action.payload}
            };
        case success(FETCH_USER):
            return {
                ...state, user: {...state.user, ...action.payload.data}
            };
        default:
            return state;
    }
};

export default Reducer;