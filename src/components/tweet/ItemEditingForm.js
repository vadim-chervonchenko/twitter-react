import React from 'react';
import {Button, Input, Form} from 'antd';

const ItemEditingForm = (props) => {
    const onUpdateItem = (e) => {
        const {id, updateTweet} = props;

        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                updateTweet(id, values.content);
                props.toggleFormVisibility();
            }
        });
    };

    const onPressEnter = (e) => {
        if (e.ctrlKey || e.metaKey) {
            const value = props.form.getFieldValue('content');
            props.form.setFieldsValue({
                content: value + '\n',
            });
        } else {
            onUpdateItem(e);
        }
    };

    const {
        content,
        form: {getFieldDecorator}
    } = props;

    return (
        <Form onSubmit={onUpdateItem}>
            <Form.Item>
                {getFieldDecorator('content', {
                    rules: [{required: true, message: 'Please input post content', whitespace: true, min: 1}],
                    initialValue: content
                })(
                    <Input
                        placeholder="Please edit your tweet"
                        className="form-control mb-3"
                        autoFocus
                        onPressEnter={onPressEnter}
                    />
                )}
                <Button type="primary" htmlType="submit">Edit tweet</Button>
            </Form.Item>
        </Form>
    )
};

export default (Form.create({name: 'listItemForm'})(ItemEditingForm));