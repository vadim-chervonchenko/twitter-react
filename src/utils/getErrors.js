export const getErrors = (errors) => {
    return [(errors.errors) ? errors.errors : errors.message];
};
