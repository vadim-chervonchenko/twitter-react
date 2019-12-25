export const REGISTER = 'REGISTER';
export const registerUser = ({email, name, password}) => {
    return {
        type: REGISTER,
        payload: {
            request: {
                url: 'register/',
                method: 'post',
                data: {
                    email,
                    name,
                    password
                }
            }
        }
    }
};
export const LOGIN = 'LOGIN';
export const loginUser = ({email, password}) => {
    return {
        type: LOGIN,
        payload: {
            request: {
                url: 'login/',
                method: 'post',
                data: {
                    email,
                    password
                }
            }
        }
    }
};
export const LOGOUT = 'LOGOUT';
export const DELETE_AUTH_HEADER = 'DELETE_AUTH_HEADER';
export const logOut = () => (dispatch) => {
    dispatch({
        type: LOGOUT,
        payload: {
            request: {
                url: 'logout/',
                method: 'post'
            }
        }
    });
    dispatch({
        type: DELETE_AUTH_HEADER
    });
};
export const FETCH_USER = 'FETCH_USER';
export const fetchUser = () => {
    return ({
        type: FETCH_USER,
        payload: {
            request: {
                url: 'user/',
                method: 'get'
            }
        },
        meta: {
            asPromise: true,
        }
    })
};
export const SET_AUTH_HEADER = 'SET_AUTH_HEADER';
export const setAuthHeader = (access_token) => {
    return ({
        type: SET_AUTH_HEADER,
        payload: access_token
    })
};
export const APP_INIT = 'APP_INIT';
export const appInit = () => ({
        type: APP_INIT
});


