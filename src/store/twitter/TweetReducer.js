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
    onSuccess: (state, action) => {
        return {
            ...state, data: [...action.data], search: ''
        }
    },
    multiple: true,
    mutations: {
        [DELETE_REQUEST]: {
            updateData : (state, action) => {
                const deleteItemId = state.data.findIndex((item) => item.id === action.meta.id);

                return [...state.data.slice(0, deleteItemId), ...state.data.slice(deleteItemId + 1)];
            }
        },
        [UPDATE_REQUEST]: {
            updateData : (state, action) => {
                const updateItemId = state.data.findIndex((item) => item.id === action.meta.id);
                const item = {...state.data[updateItemId], content: action.data.content, updated_at: action.data.updated_at};

                return [...state.data.slice(0, updateItemId), item, ...state.data.slice(updateItemId + 1)];
            }
        },
        [ADD_REQUEST]: {
            updateData : (state, action) => {

                return [...state.data, action.data];
            }
        },
        [SEARCH_QUERY]: {
            updateData : (state, action) => {
                return {
                    ...state, search: action.meta.searchQuery
                }
            },
            local: true
        }
    }
});