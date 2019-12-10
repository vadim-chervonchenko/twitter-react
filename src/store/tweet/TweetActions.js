export const GETALL_REQUEST = 'TWEET_GETALL_REQUEST';
export const getListTweets = () => {
    return {
        type: GETALL_REQUEST,
        request: {
            url: 'tweets/'
        }
    }
};
export const ADD_REQUEST = 'TWEET_ADD_REQUEST';
export const addTweet = (content) => (
    {
        type: ADD_REQUEST,
        request: {
            url: 'tweets/',
            method: 'post',
            data: {
                content
            }
        },
        meta: {
            content
        }
    }
);
export const DELETE_REQUEST = 'TWEET_DELETE_REQUEST';
export const delTweet = (id) => (
    {
        type: DELETE_REQUEST,
        request: {
            url: `tweets/${id}`,
            method: 'delete',
            data: {
                id
            }
        },
        meta: {
            id
        }
    }
);
export const UPDATE_REQUEST = 'TWEET_UPDATE_REQUEST';
export const updateTweet = (id, content) => (
    {
        type: UPDATE_REQUEST,
        request: {
            url: `tweets/${id}`,
            method: 'put',
            data: {
                id, content
            }
        },
        meta: {
            id
        }
    }
);
export const SEARCH_QUERY = 'SET_SEARCH_QUERY';
export const setSearchQuery = (searchQuery) => (
    {
        type: SEARCH_QUERY,
        meta: {
            searchQuery
        }
    }
);