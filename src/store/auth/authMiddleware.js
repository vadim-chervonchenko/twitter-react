import {success, error} from 'redux-saga-requests';
import {AuthService} from '../../storage/authService';
import {
    REGISTER,
    LOGIN,
    APP_INIT,
    fetchUser,
    setAuthHeader,
    LOGOUT
} from './authActions';
import {setError} from '../error/errorActions';

export const authMiddleware = (store) => next => async action => {
    switch (action.type) {
        case success(REGISTER):
        case success(LOGIN):
            const { access_token: accessToken } = action.payload.data;

            AuthService.setToken('access_token', accessToken);
            next(setAuthHeader(accessToken));
            await next(fetchUser());

            break;
        case error(REGISTER):
        case error(LOGIN):

            /* костыль - переделать, иногде приходят  error,  а инога приходит message, возможно стоит запилить обработчик ошибок, который будет
            * их встречать и обрабатывать */

            let a = '';
           if ( action.payload.response.data.errors ) {
               a = action.payload.response.data.errors;
           } else {
               a = action.payload.response.data.message;
           }

            next(setError([a]));
            break;
        case APP_INIT:
            try {
                const access_token = AuthService.getToken('access_token');

                if (access_token) {
                    next(setAuthHeader(access_token));
                    await next(fetchUser());
                }
            } catch (errors) {

                /* + ошибка сервера, ее тоже нужно обрабатывать response = undefined
                * а ошибка в другом месте */

                console.log(errors);

                let a = '';
                if ( errors.payload.response.data.errors ) {
                    a = errors.payload.response.data.errors;
                } else {
                    a = errors.payload.response.data.message;
                }

                next(setError([a]));
            }
            break;
        case LOGOUT:
            AuthService.unsetToken('access_token');
            break;
        default:
            break;
    }
    return next(action);
};
