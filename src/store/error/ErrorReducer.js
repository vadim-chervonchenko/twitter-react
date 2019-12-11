export const SHOW_ERROR_MODAL = 'SHOW_ERROR_MODAL';

const initialState = {
    errors: ''
};

const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_ERROR_MODAL:
            return {
                ...state, errors: Math.random()
            };
        default:
            return state;
    }
};

export default Reducer;