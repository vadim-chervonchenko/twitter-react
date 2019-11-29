import {tweetConstants} from '../../../types/constants.js';

const initialState = {
    items: [],
    search: '',
    errors: '',
    loading: false
};

export const tweetReducer = (state = initialState, action) => {

    switch (action.type) {
        case tweetConstants.ADD_REQUEST:
        case tweetConstants.DELETE_REQUEST:
        case tweetConstants.UPDATE_REQUEST:
        case tweetConstants.GETALL_REQUEST:
            return {
                ...state,
                loading: true
            };
        case tweetConstants.ADD_FAILURE:
        case tweetConstants.DELETE_FAILURE:
        case tweetConstants.UPDATE_FAILURE:
        case tweetConstants.GETALL_FAILURE:
            return {
                ...state,
                loading: false,
                errors: action.payload.errors
            };
        case tweetConstants.ADD_SUCCESS:
            return {
                ...state,
                items: [...state.items, {content: action.payload.content, id: action.payload.id}]};
        case tweetConstants.DELETE_SUCCESS:
            return {
                ...state,
                items: [...state.items.slice(0, action.payload.id), ...state.items.slice(action.payload.id + 1)]
            };
        case tweetConstants.UPDATE_SUCCESS:
            return {
                ...state,
                items: [...state.items.slice(0, action.payload.id), action.payload.item, ...state.items.slice(action.payload.id + 1)]
            };
        case tweetConstants.GETALL_SUCCESS:

            return {
                ...state,
                items: action.payload.items
            };
        case tweetConstants.SEARCH_QUERY:
            return {
                ...state,
                search: action.payload.searchQuery
            };
        default:
            return state;
    }
};

