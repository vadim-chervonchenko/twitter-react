import {SET_ERROR} from './errorActions';

const initialState = {
    errorsArr: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_ERROR:
            return {
               errorsArr: action.payload.errors
            };
        default:
            return state;
    }
};