import React from 'react';
import {connect} from 'react-redux';
import {updateTweet} from '../store/tweet/TweetActions';
import {Button, Input, Form} from 'antd';

const ItemEditingForm = (props) => {

    const {formVisibilityToggle} = props;
    const formStyle = formVisibilityToggle ? '' : 'd-none';
    const {getFieldDecorator} = props.form;

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

    const onUpdateItem = (e) => {
        e.preventDefault();
        const {itemId, formVisibilityChange} = props;

        props.form.validateFields((err, values) => {
            if (!err) {
                props.updateTweet(
                    itemId,
                    values.content
                );
            }
        });
        formVisibilityChange();
    };

    return (
        <Form className={`pt-3 ${formStyle}`}
              onSubmit={onUpdateItem}>
            <Form.Item>
                {getFieldDecorator('content', {
                    rules: [{required: true, message: 'Please input post content', whitespace: true, min: 1}],
                    initialValue: ''
                })(
                    <Input
                        placeholder="Please edit your tweet"
                        className="form-control mb-3"
                        autoFocus
                        onPressEnter={onPressEnter}
                    />
                )}
            </Form.Item>
            <Form.Item style={{textAlign: 'center'}}>
                <Button type="primary" htmlType="submit">Edit tweet</Button>
            </Form.Item>
        </Form>
    );
};

export default connect(
    null,
    {updateTweet}
)(Form.create({name: 'editForm'})(ItemEditingForm));