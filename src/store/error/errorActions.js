export const SET_ERROR = 'SET_ERROR';
export const setError = ({data: {errors = []}, status}) => {
    if ( status === 404 ) {
        errors.push(status);
    }

    return ({
        type: SET_ERROR,
        payload: {
            errors
        }
    });
};
