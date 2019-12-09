import React from 'react';
import {Link} from 'react-router-dom';
import 'antd/dist/antd.css';
import {Form, Input, Button, Icon} from 'antd';

import {loginUser} from '../store/auth/AuthActions';
import {connect} from "react-redux";

const LoginForm = (props) => {
    const {getFieldDecorator} = props.form;

    const onFormSubmit = (e) => {
        e.preventDefault();
        props.form.validateFieldsAndScroll((err, values) => {

            console.log(props);

            props.loginUser(values);
        });
    };

    return (
        <Form
            onSubmit={onFormSubmit}>
            <Form.Item>
                {getFieldDecorator('username', {
                    rules: [{required: true, message: 'Please input your username!'}],
                })(
                    <Input
                        prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                        placeholder="Username"
                    />,
                )}
            </Form.Item>
            <Form.Item>
                {getFieldDecorator('password', {
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
                <Button type="primary" htmlType="submit">Log in</Button>
                <p className="d-inline ml-4">
                    <Link to="/signup">Sign up</Link>
                </p>
            </Form.Item>
        </Form>
    );
};

export default connect(
    state => ({
       state
    }),
    {
        loginUser
    }
)(Form.create({name: 'loginForm'})(LoginForm));