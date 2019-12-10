import './ErrorActions';
import {
    SHOW_ERROR_MODAL
} from './ErrorActions';

const initialState = {
    errors: ''
};

const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_ERROR_MODAL:
            return {
                ...state, errors: Math.random() /*action.payload.message*/
            };
        default:
            return state;
    }
};

export default Reducer;