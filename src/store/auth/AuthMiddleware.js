/*
  *
  * Вопросов 3 ,
  * что отлавливать ( FETCH_USER_REQUEST или FETCH_USER_REQUEST_SUCCESS ) и
  * как потом диспатчить нужные экшнкриэйтор
  * как использовать try catch во время диспатча событий.
   *
   *
   * */

import axios from "axios/index";

const axiosInstance = axios.create({
    baseURL: '/api/',
});

export const authTokenMiddleware = (store) => (next) => (action) => {
    if (action.type === 'SET_JWT_TOKEN') {
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
        action.access_token = localStorage.getItem('access_token');
    }

    if ( action.type === 'USERS_LOGIN_REQUEST_SUCCESS' || action.type === 'USERS_REGISTER_REQUEST_SUCCESS' ) {
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer${action.data.access_token}`;
    }

    return next( action );
};

export const authMiddleware = ({getState, dispatch}) => (next) => async (action) => {
    switch (action.type) {
        case SOME_ACTION:
            const asyncResult = await somethingAsync();
            dispatch(anotherAction(asyncResult));
            break;
        case SOME_OTHER_ACTION:
            const { slice: { stateVariable } } = getState();
            await someProcess(stateVariable);
            break;
    }
    return next(action);
};

async function fetchAndUpdatePosts() {
    let posts;

    try {
        posts = await fetchPosts(); // берем посты
    } catch {
        console.log('error in fetching posts');
    }

    if (!posts) {
        return;
    }

    try {
        await updatePosts(); // обновляем посты.
    } catch {
        console.log('error in updating posts');
    }

    const postsd = await fetchPosts().catch(() => {
        console.log('error in fetching posts');
    });

}
