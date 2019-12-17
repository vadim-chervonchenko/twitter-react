import './tweetActions';
import {success} from 'redux-saga-requests';
import {
    ADD_TWEET,
    DELETE_TWEET,
    UPDATE_TWEET,
    GETALL_TWEETS,
    SET_SEARCH_QUERY
} from './tweetActions';

const initialState = {
    items: [],
    lastPage: 1,
    search: ''
};

export default (state = initialState, action) => {
    switch (action.type) {
        case success(ADD_TWEET):
            return {
                ...state,
                items: [...state.items, action.payload.data]
            };
        case success(DELETE_TWEET):
            const deleteItemId = state.items.findIndex((item) => item.id === action.meta.id);
            return {
                ...state,
                items: [...state.items.slice(0, deleteItemId), ...state.items.slice(deleteItemId + 1)]
            };
        case success(UPDATE_TWEET):
            const updateItemId = state.items.findIndex((item) => item.id === action.meta.id);
            const item = {...state.items[updateItemId], content: action.payload.data.content};

            return {
                ...state,
                items: [...state.items.slice(0, updateItemId), item, ...state.items.slice(updateItemId + 1)]
            };
        case success(GETALL_TWEETS):
            const { data: items, last_page: lastPage } = action.payload.data;

            return {
                ...state, items: [ ...state.items, ...items ], lastPage
            };
        case SET_SEARCH_QUERY:
            return {
                ...state,
                search: action.payload.searchQuery
            };
        default:
            return state;
    }
};