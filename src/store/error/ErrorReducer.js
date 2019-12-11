export const SHOW_ERROR_MODAL = 'SHOW_ERROR_MODAL';

/* state, как мне кажется , гавно и его лучше переделать. и сам экшн, ну такое */
const initialState = {
    errors: ''
};

/* с ошибками понятно , вернее ничего не понятно , но нужно понять как правильно сделать и доделать */
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