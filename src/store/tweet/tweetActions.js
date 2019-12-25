export const GETALL_TWEETS = 'GETALL_TWEETS';
export const getListTweets = (params = {}) => {
    const queryParams = Object.entries(params).map(item => item.join('=')).join('&');

    return {
        type: GETALL_TWEETS,
        payload: {
            request: {
                url: `tweets/?${queryParams}`
            }
        }
    }
};
export const GET_TAG_TWEETS = 'GET_TAG_TWEETS';
export const getHashTags = (tagName = '') => {
    return {
        type: GET_TAG_TWEETS,
        payload: {
            request: {
                url: `/hashtag/${tagName}`
            }
        },
        meta: {asPromise: true}
    }
};
export const GET_MENTIONS = 'GET_MENTIONS';
export const getMentions = (mentionName = '') => {
    return {
        type: GET_MENTIONS,
        payload: {
            request: {
                url: `/mention/${mentionName}`
            }
        },
        meta: {asPromise: true}
    }
};
export const ADD_TWEET = 'ADD_TWEET';
export const addTweet = (content = '') => (
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
export const updateTweet = (id, content, listId) => (
    {
        type: UPDATE_TWEET,
        payload: {
            request: {
                url: `tweets/${id}`,
                method: 'put',
                data: {
                    id, content, listId
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
export const EMPTY_POSTS = 'EMPTY_POSTS';
export const emptyPosts = () => (
    {
        type: EMPTY_POSTS
    }
);

