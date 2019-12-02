import React from 'react';
import {Field} from 'redux-form';

const RegisterForm = ({...props}) => {
    const {handleSubmit, pristine, submitting} = props;

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="email">Email address:</label>
                <div>
                    <Field
                        name="userEmail"
                        component="input"
                        type="text"
                        placeholder="First Name"
                        className="form-control"
                    />
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="email">Last Name:</label>
                <div>
                    <Field
                        name="lastName"
                        component="input"
                        type="text"
                        placeholder="Last Name"
                        className="form-control"
                    />
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="pwd">Password:</label>
                <div>
                    <Field
                        name="userPassword"
                        component="input"
                        type="Password"
                        placeholder="Password"
                        className="form-control"
                    />
                </div>
            </div>
            <button
                type="submit"
                disabled={pristine || submitting}
                className="btn btn-primary mr-2">Submit
            </button>
        </form>
    );
};

export default RegisterForm;