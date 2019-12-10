import './TweetActions';
import {success} from 'redux-saga-requests';
import {
    ADD_REQUEST,
    DELETE_REQUEST,
    UPDATE_REQUEST,
    GETALL_REQUEST,
    SEARCH_QUERY
} from './TweetActions';

const initialState = {
    items: [],
    search: '',
    pending: false
};

const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_REQUEST:
        case DELETE_REQUEST:
        case UPDATE_REQUEST:
        case GETALL_REQUEST:
            return {
                ...state,
                pending: true
            };
        case success(ADD_REQUEST):
            return {
                ...state,
                items: [...state.items, action.data],
                pending: false
            };
        case success(DELETE_REQUEST):
            const deleteItemId = state.items.findIndex((item) => item.id === action.meta.id);
            return {
                ...state,
                items: [...state.items.slice(0, deleteItemId), ...state.items.slice(deleteItemId + 1)],
                pending: false
            };
        case success(UPDATE_REQUEST):
            const updateItemId = state.items.findIndex((item) => item.id === action.meta.id);
            const item = {...state.items[updateItemId], content: action.data.content};

            return {
                ...state,
                items: [...state.items.slice(0, updateItemId), item, ...state.items.slice(updateItemId + 1)],
                pending: false
            };
        case success(GETALL_REQUEST):
            return {
                ...state,
                items: action.data,
                pending: false
            };
        case SEARCH_QUERY:
            return {
                ...state,
                search: action.meta.searchQuery,
                pending: false
            };
        default:
            return state;
    }
};

export default Reducer;