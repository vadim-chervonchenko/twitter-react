import React from 'react';
import 'antd/dist/antd.css';
import {Form, Input, Button, Icon} from 'antd';
import {connect} from 'react-redux';
import {registerUser} from '../store/auth/AuthActions';

const RegistrationForm = (props) => {
    const {getFieldDecorator} = props.form;

    const onFormSubmit = (e) => {
        e.preventDefault();
        props.form.validateFieldsAndScroll((err, values) => {
            props.registerUser(values);
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
                        placeholder="UserEmail"
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
                        placeholder="lastName"
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
                        placeholder="userPassword"
                    />,
                )}
            </Form.Item>
            <Form.Item style={{textAlign: 'center'}}>
                <Button type="primary" htmlType="submit">Sign up</Button>
            </Form.Item>
        </Form>
    );
};

export default connect(
    null,
    {
        registerUser
    }
)(Form.create({name: 'registerForm'})(RegistrationForm));