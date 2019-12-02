import {required, length, email} from 'redux-form-validators';
import _ from 'lodash';

const humanize = str => str
    .replace(/^[\s_]+|[\s_]+$/g, '')
    .replace(/[_\s]+/g, ' ')
    .replace(/[.]+/g, ' ');

export const rules = {
    first_name: [
        required(),
        length({max: 255}),
    ],
    last_name: [
        required(),
        length({max: 255}),
    ],
    email: [
        required(),
        email(),
    ]
};

export const validateReduxForm = validations => (values) => {
    const errors = {};
    for (const field in validations) {
        const value = _.get(values, field);
        const errorText = validations[field].map(validateField => validateField(value, values)).find(x => x);
        _.set(errors, field, errorText && `The ${humanize(field)} ${errorText}`);
    }
    return errors;
};
