import './TweetActions';
import {success} from 'redux-saga-requests';
import {
    ADD_REQUEST,
    DELETE_REQUEST,
    UPDATE_REQUEST,
    GETALL_REQUEST,
    SEARCH_QUERY
} from './TweetActions';

/* переделать  initialState и добавить флаги по необходимости */
const initialState = {
    items: [],
    search: ''
};

/* переделать по образу и подобию редьюсера авторизации */
const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case success(ADD_REQUEST):
            return {
                ...state,
                items: [...state.items, action.payload.data]
            };
        case success(DELETE_REQUEST):
            const deleteItemId = state.items.findIndex((item) => item.id === action.meta.id);
            return {
                ...state,
                items: [...state.items.slice(0, deleteItemId), ...state.items.slice(deleteItemId + 1)]
            };
        case success(UPDATE_REQUEST):
            const updateItemId = state.items.findIndex((item) => item.id === action.meta.id);
            const item = {...state.items[updateItemId], content: action.payload.data.content};

            return {
                ...state,
                items: [...state.items.slice(0, updateItemId), item, ...state.items.slice(updateItemId + 1)]
            };
        case success(GETALL_REQUEST):
            return {
                ...state,
                items: action.payload.data
            };
        case SEARCH_QUERY:
            return {
                ...state,
                search: action.payload.searchQuery
            };
        default:
            return state;
    }
};

export default Reducer;