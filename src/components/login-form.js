import React from 'react';
import {Link} from 'react-router-dom';
import {Field} from 'redux-form';

const LoginForm = ({ ...props }) => {

    return(
        <form onSubmit={props.handleSubmit}>
            <div className="form-group">
                <label htmlFor="email">Email address:</label>
                <div>
                    <Field
                        name="userEmail"
                        component="input"
                        type="text"
                        placeholder="Email"
                        className="form-control"
                    />
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="pwd">Password:</label>
                <div>
                    <Field
                        name="userPass"
                        component="input"
                        type="password"
                        placeholder="Password"
                        className="form-control"
                    />
                </div>
            </div>
            <div className="form-group">
                <label className="form-check-label">
                    <div>
                        <Field
                            name="employed"
                            id="employed"
                            component="input"
                            type="checkbox"
                        /> Remember me
                    </div>
                </label>
            </div>
            <button
                type="submit"
                disabled={props.pristine || props.submitting}
                className="btn btn-primary mr-2">Submit
            </button>
            <p className="d-inline ml-4">
                <Link to="/signup">Sign up</Link>
            </p>
        </form>
    );
};

export default LoginForm;