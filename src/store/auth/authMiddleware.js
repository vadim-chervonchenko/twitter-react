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
            next(setError(action.payload.response));
            break;
        case APP_INIT:
            try {
                const access_token = AuthService.getToken('access_token');

                if (access_token) {
                    next(setAuthHeader(access_token));
                    await next(fetchUser());
                }
            } catch (errors) {
                next(setError(errors.payload.response));
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
