export const SET_ERROR = 'SET_ERROR';
export const setError = ({data,data: {errors = []}, status}) => {

    if ( errors.length === 0 ) {
        errors.push('Something went wrong');
    } else if ( status === 404 ) {
        errors.push(status);
    }

    return ({
        type: SET_ERROR,
        payload: {
            errors
        }
    });
};
