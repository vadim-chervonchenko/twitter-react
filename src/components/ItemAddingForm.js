import React from 'react';
import {connect} from 'react-redux';
import 'antd/dist/antd.css';
import {Form, Input, Button} from 'antd';
import {addTweet} from '../store/tweet/TweetActions';

const ItemAddingForm = (props) => {


    /* обработчики для форм лучше вынести в отдельный файл и назвать их утилитами какими-то, а то чет они мне глаза мазолят */
    const handleSubmit = (e) => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                props.addTweet(values.content);
            }
        });
        props.form.resetFields();
    };

    const onPressEnter = (e) => {
        if (e.ctrlKey || e.metaKey) {
            const value = props.form.getFieldValue('content');
            props.form.setFieldsValue({
                content: value + '\n',
            });
        } else {
            handleSubmit(e);
        }
    };

    const {TextArea} = Input;
    const {getFieldDecorator} = props.form;

    return (
        <Form
            onSubmit={handleSubmit}>
            <Form.Item>
                {getFieldDecorator('content', {
                    rules: [{required: true, message: 'Please input post content', whitespace: true, min: 1}],
                    initialValue: ''
                })(
                    <TextArea
                        autoSize={{minRows: 4, maxRows: 10}}
                        placeholder="Put your text here"
                        autoFocus
                        onPressEnter={onPressEnter}
                    > </TextArea>

                    /* тут как раз и будет размещать весь блок с автокомплитом, нужно подумать как это лучше сделать */
                )}
            </Form.Item>
            <Form.Item style={{textAlign: 'center'}}>
                <Button type="primary" htmlType="submit">Add Post</Button>
            </Form.Item>
        </Form>
    );
};

export default connect( null, {addTweet} )( Form.create({name: 'addPost'} )(ItemAddingForm)); // длинная хуйня , может разобраться как лучше сократить и как лучше это сделать.