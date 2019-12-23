export const SET_ERROR = 'SET_ERROR';
export const setError = ({data: {errors = []}}) => {
    return ({
        type: SET_ERROR,
        payload: {
            errors
        }
    });
};
