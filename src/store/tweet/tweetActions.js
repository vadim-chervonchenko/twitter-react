export const GETALL_TWEETS = 'GETALL_TWEETS';
export const getListTweets = () => {
    return {
        type: GETALL_TWEETS,
        payload: {
            request: {
                url: 'tweets/'
            }
        }
    }
};
export const ADD_TWEET = 'ADD_TWEET';
export const addTweet = (content) => (
    {
        type: ADD_TWEET,
        payload: {
            request: {
                url: 'tweets/',
                method: 'post',
                data: {
                    content
                }
            }
        },
        meta: {
            content
        }
    }
);
export const DELETE_TWEET = 'DELETE_TWEET';
export const delTweet = (id) => (
    {
        type: DELETE_TWEET,
        payload: {
            request: {
                url: `tweets/${id}`,
                method: 'delete',
                data: {
                    id
                }
            }
        },
        meta: {
            id
        }
    }
);
export const UPDATE_TWEET = 'UPDATE_TWEET';
export const updateTweet = (id, content) => (
    {
        type: UPDATE_TWEET,
        payload: {
            request: {
                url: `tweets/${id}`,
                method: 'put',
                data: {
                    id, content
                }
            }
        },
        meta: {
            id
        }
    }
);
export const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';
export const setSearchQuery = (searchQuery) => (
    {
        type: SET_SEARCH_QUERY,
        payload: {
            searchQuery
        }
    }
);