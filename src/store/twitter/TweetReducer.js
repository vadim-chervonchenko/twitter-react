import './TweetActions';
import {
    ADD_REQUEST,
    DELETE_REQUEST,
    UPDATE_REQUEST,
    GETALL_REQUEST,
    SEARCH_QUERY
} from './TweetActions';
import {
    ADD_FAILURE,
    DELETE_FAILURE,
    UPDATE_FAILURE,
    GETALL_FAILURE,
    ADD_SUCCESS,
    DELETE_SUCCESS,
    UPDATE_SUCCESS,
    GETALL_SUCCESS,
} from './TweetSaga';

const initialState = {
    items: [],
    search: '',
    errors: '',
    loading: false
};

export const tweetReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_REQUEST:
        case DELETE_REQUEST:
        case UPDATE_REQUEST:
        case GETALL_REQUEST:
            return {
                ...state,
                loading: true
            };
        case ADD_FAILURE:
        case DELETE_FAILURE:
        case UPDATE_FAILURE:
        case GETALL_FAILURE:
            return {
                ...state,
                loading: false,
                errors: action.payload.errors
            };
        case ADD_SUCCESS:

            /*onsole.log([...state.items, action.payload.item]);*/
            console.log(action.payload);

            return {
                ...state,
                items: [...state.items, action.payload.item],
                loading: false
            };
        case DELETE_SUCCESS:
            const deleteItemId = state.items.findIndex((item) => item.id === action.payload.id);
            return {
                ...state,
                items: [...state.items.slice(0, deleteItemId), ...state.items.slice(deleteItemId + 1)],
                loading: false
            };
        case UPDATE_SUCCESS:
            const updateItemId = state.items.findIndex((item) => item.id === action.payload.id);
            const item = {...state.items[updateItemId], content: action.payload.content};

            return {
                ...state,
                items: [...state.items.slice(0, updateItemId), item, ...state.items.slice(updateItemId + 1)],
                loading: false
            };
        case GETALL_SUCCESS:

            return {
                ...state,
                items: action.payload.items,
                loading: false
            };
        case SEARCH_QUERY:
            return {
                ...state,
                search: action.payload.searchQuery,
                loading: false
            };
        default:
            return state;
    }
};

