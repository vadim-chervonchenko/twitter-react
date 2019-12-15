import {SET_ERROR} from './errorAction';

const initialState = {
    errors: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_ERROR:
            return {
                ...state, errors: action.payload.errors
            };
        default:
            return state;
    }
};