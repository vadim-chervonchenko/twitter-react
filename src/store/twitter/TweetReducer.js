import './TweetActions';
import { requestsReducer } from 'redux-saga-requests';

import {
    ADD_REQUEST,
    DELETE_REQUEST,
    UPDATE_REQUEST,
    GETALL_REQUEST,
    SEARCH_QUERY
} from './TweetActions';

export const tweetReducer = requestsReducer({
    actionType: GETALL_REQUEST,
    multiple: true,
    mutations: {
        [DELETE_REQUEST]: {
            updateData : (state, action) => {
                const deleteItemId = state.items.findIndex((item) => item.id === action.payload.id);
                return {
                    ...state,
                    items: [...state.items.slice(0, deleteItemId), ...state.items.slice(deleteItemId + 1)],
                    loading: false
                };
            }
        },
        [UPDATE_REQUEST]: {
            updateData : (state, action) => {
                const updateItemId = state.items.findIndex((item) => item.id === action.payload.id);
                const item = {...state.items[updateItemId], content: action.payload.content, updated_at: action.payload.updated_at};

                return {
                    ...state,
                    items: [...state.items.slice(0, updateItemId), item, ...state.items.slice(updateItemId + 1)],
                    loading: false
                };
            }
        },
        [ADD_REQUEST]: {
            updateData : (state, action) => {
                return {
                    ...state,
                    items: [...state.items, action.payload.item],
                    loading: false
                };
            }
        },
        [SEARCH_QUERY]: {
            updateData : (state, action) => {
                return {
                    ...state,
                    search: action.payload.searchQuery,
                    loading: false
                };
            }
        }
    }
});