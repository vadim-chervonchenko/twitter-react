export const REGISTER_REQUEST = 'USERS_REGISTER_REQUEST';
export const registerUser = ( { userEmail, lastName, userPassword } ) => {
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
export const loginUser = ({ userEmail, userPass }) => {
    return {
        type: LOGIN_REQUEST,
        request: {
            url: 'login/',
            method: 'post',
            data: {
                email: userEmail,
                password: userPass
            }
        }
    }
};
export const USER_LOGOUT = 'USERS_LOGOUT';
export const logOut = () => ({
    type: USER_LOGOUT,
    request: {
        url: 'logout/',
        method: 'post'
    }
});
export const SET_JWT_TOKEN = 'SET_JWT_TOKEN';
export const setJwtToken = () => ({
    type: SET_JWT_TOKEN
});
