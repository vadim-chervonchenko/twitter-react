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
    pagination: {
        lastPage: 1,
        perPage: 5,
        nextPage: 1
    },
    search: ''
};

export default (state = initialState, action) => {
    switch (action.type) {
        case success(ADD_TWEET):
            return {
                ...state,
                items: [action.payload.data, ...state.items]
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

            /* получается так
            * скрол - ( каждую последующую партию мне нужно добавлять в state - эффект инфините скрола )
            * edit, delete, add - ( либо работаем по стейтом, а потом получаем посты, просто получаем посты  ) - тут еще нужно делать так чтобы не провоцировать инфиниты скрол на подкрузку новых постов.
            *  */
        case success(GETALL_TWEETS):
            const { data: items, last_page: lastPage, per_page: perPage, current_page: currentPage } = action.payload.data;

            let b = (currentPage === 1) ? [ ...items ] : [ ...state.items, ...items ];

            return {
                ...state, items: b, pagination: { ...state.pagination, lastPage, perPage }
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