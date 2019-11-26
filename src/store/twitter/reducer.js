import { userConstants, alertConstants, tweetConstants } from '../../constants/constants.js'

const initialState = {
    items: [],
    search: '',
    user: false,
    token: ''
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case tweetConstants.ADD_REQUEST:
            return {
                ...state,
                items: [...state.items, {label: action.payload.label, id: action.payload.id}]};
        case tweetConstants.DELETE_REQUEST:
            return {
                ...state,
                items: [...state.items.slice(0, action.payload.id), ...state.items.slice(action.payload.id + 1)]
            };
        case tweetConstants.UPDATE_REQUEST:
            return {
                ...state,
                items: [...state.items.slice(0, action.payload.id), action.payload.item, ...state.items.slice(action.payload.id + 1)]
            };
        case tweetConstants.GETALL_REQUEST:
            return {
                ...state,
                items: action.payload.items
            };
        case tweetConstants.SEARCH_QUERY:
            return {
                ...state,
                search: action.payload.searchQuery
            };
        case userConstants.REGISTER_REQUEST:
            return {
                ...state,
                user: false,
                token: action.payload.token
            };
        case userConstants.LOGIN_REQUEST:
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token
            };
        default:
            return state;
    }
};
