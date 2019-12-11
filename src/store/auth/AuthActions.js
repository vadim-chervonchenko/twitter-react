export const REGISTER_REQUEST = 'USERS_REGISTER_REQUEST';
export const registerUser = ({userEmail, lastName, userPassword}) => {
    return {
        type: REGISTER_REQUEST,
        payload: {
            request: {
                url: 'register/',
                method: 'post',
                data: {
                    email: userEmail,
                    name: lastName,
                    password: userPassword
                }
            }
        }
    }
};
export const LOGIN_REQUEST = 'USERS_LOGIN_REQUEST';
export const loginUser = ({username, password}) => {
    return {
        type: LOGIN_REQUEST,
        payload: {
            request: {
                url: 'login/',
                method: 'post',
                data: {
                    email: username,
                    password: password
                }
            }
        }
    }
};

export const USER_LOGOUT = 'USERS_LOGOUT';
export const logOut = () => (dispatch) => {
    dispatch({
        type: USER_LOGOUT,
        payload: {
            request: {
                url: 'logout/',
                method: 'post'
            }
        }
    });
    dispatch(deleteAuthHeader());
};

export const DELETE_AUTH_HEADER = 'DELETE_AUTH_HEADER';
export const deleteAuthHeader = () => {
    return ({
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
export const appInit = () => async (dispatch) => {
    try {
        const access_token = localStorage.getItem('access_token');

        if (access_token) {
            dispatch({
                type: APP_INIT,
                payload: access_token
            });
            dispatch(setAuthHeader(access_token));
            await dispatch(fetchUser());
        }
    } catch (error) {
        console.log(error);
    }
};


