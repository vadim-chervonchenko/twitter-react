import React from 'react';
import {Form, Input, Button, Icon} from 'antd';
import {connect} from 'react-redux';
import {registerUser} from '../../store/auth/authActions';
import {Link} from 'react-router-dom';

const RegistrationForm = (props) => {

    const {getFieldDecorator} = props.form;

    const onFormSubmit = (e) => {
        e.preventDefault();
        props.form.validateFieldsAndScroll((err, { userEmail: email, lastName: name, userPassword: password  }) => {
            if (!err) {
                props.registerUser({ email, name, password });
            }
        });
    };

    return (
        <Form
            onSubmit={onFormSubmit}>
            <Form.Item>
                {getFieldDecorator('userEmail', {
                    rules: [{required: true, message: 'Please input your UserEmail!'}],
                })(
                    <Input
                        prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                        type="text"
                        placeholder="Email"
                    />,
                )}
            </Form.Item>
            <Form.Item>
                {getFieldDecorator('lastName', {
                    rules: [{required: true, message: 'Please input your Name!'}],
                })(
                    <Input
                        prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                        type="text"
                        placeholder="Name"
                    />,
                )}
            </Form.Item>
            <Form.Item>
                {getFieldDecorator('userPassword', {
                    rules: [{required: true, message: 'Please input your Password!'}],
                })(
                    <Input
                        prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                        type="password"
                        placeholder="Password"
                    />,
                )}
            </Form.Item>
            <Form.Item style={{textAlign: 'center'}}>
                <Button type="primary" htmlType="submit">Sign up</Button>
                <p className="d-inline ml-4">
                    <Link to="/login">Log in</Link>
                </p>
            </Form.Item>
        </Form>
    );
};

export default connect(null, {registerUser})(Form.create({name: 'registerForm'})(RegistrationForm));