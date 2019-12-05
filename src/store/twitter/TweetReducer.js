import './TweetActions';
import {requestsReducer} from 'redux-saga-requests';
import {
    ADD_REQUEST,
    DELETE_REQUEST,
    UPDATE_REQUEST,
    GETALL_REQUEST,
    SEARCH_QUERY
} from './TweetActions';

export const tweetReducer = requestsReducer({
    actionType: GETALL_REQUEST,
    onSuccess: (state, action) => {
        return {
            ...state, data: { items: [...action.data], search: ''},
        }
    },
    multiple: true,
    mutations: {
        [DELETE_REQUEST]: {
            updateData: (state, action) => {
                const deleteItemId = state.data.items.findIndex((item) => item.id === action.meta.id);
                return {
                    ...state.data, items: [...state.data.items.slice(0, deleteItemId), ...state.data.items.slice(deleteItemId + 1)]
                }
            }
        },
        [UPDATE_REQUEST]: {
            updateData: (state, action) => {
                const updateItemId = state.data.items.findIndex((item) => item.id === action.meta.id);
                const item = {
                    ...state.data.items[updateItemId],
                    content: action.data.content,
                    updated_at: action.data.updated_at
                };
                return {
                    ...state.data, items:  [...state.data.items.slice(0, updateItemId), item, ...state.data.items.slice(updateItemId + 1)]
                }
            }
        },
        [ADD_REQUEST]: {
            updateData: (state, action) => {
                return {
                    ...state.data, items: [...state.data.items, action.data]
                }
            }
        },
        [SEARCH_QUERY]: {
            updateData: (state, action) => {
                return {
                    ...state.data, search: action.meta.searchQuery
                }
            },
            local: true
        }
    }
});