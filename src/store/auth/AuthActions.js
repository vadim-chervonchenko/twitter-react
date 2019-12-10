export const REGISTER_REQUEST = 'USERS_REGISTER_REQUEST';
export const registerUser = ({userEmail, lastName, userPassword}) => {
    return {
        type: REGISTER_REQUEST,
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
};
export const LOGIN_REQUEST = 'USERS_LOGIN_REQUEST';
export const loginUser = ({username, password}) => {
    return {
        type: LOGIN_REQUEST,
        request: {
            url: 'login/',
            method: 'post',
            data: {
                email: username,
                password: password
            }
        }
    }
};
export const USER_LOGOUT = 'USERS_LOGOUT';
export const logOut = () => (
    {
        type: USER_LOGOUT,
        request: {
            url: 'logout/',
            method: 'post'
        }
    }
);
export const SET_JWT_TOKEN = 'SET_JWT_TOKEN';
export const setJwtToken = () => (
    {
        type: SET_JWT_TOKEN
    }
);
export const FETCH_USER = 'FETCH_USER';
export const fetchUser = () => {
    return ({
        type: FETCH_USER,
        request: {
            url: 'user/',
            method: 'get'
        },
        meta: {
            asPromise: true,
        }
    })
};
export const APP_INIT = 'APP_INIT'; // get user
export const appInit = () => {
    return ({
        type: APP_INIT
    })
};


