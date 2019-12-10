import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import 'antd/dist/antd.css';
import {Form, Input, Button} from 'antd';
import {addTweet} from '../store/tweet/TweetActions';

// autoComplete text area
import AutocompleteTextField from "./AutoComplite";


class ItemAddingForm extends Component {
    onLabelChange = (e) => {
        this.setState({
            content: e.target.value
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        this.props.form.validateFields((err) => {
            if (!err && this.state.content !== "") {
                this.props.addTweet(this.state.content);
            }
        });
        this.props.form.resetFields();
    };

    onPressEnter = (e) => {
        console.log(e);
    };

    render() {
        const {TextArea} = Input;
        const {getFieldDecorator} = this.props.form;

        return (
            <Fragment>
                <Form
                    onSubmit={this.handleSubmit}>
                    <Form.Item>
                        {getFieldDecorator('content', {
                            rules: [{required: true, message: 'Please input post content', whitespace: true, min: 1}],
                            initialValue: ''
                        })(
                            <TextArea
                                autoSize={{minRows: 4, maxRows: 10}}
                                placeholder="Put your text here"
                                autoFocus
                                onPressEnter={this.onPressEnter}
                                onChange={this.onLabelChange}
                            > </TextArea>
                        )}
                    </Form.Item>
                    <Form.Item>
                        <AutocompleteTextField options={["stats", "dima", "misha", "vadim"]} trigger="#" />
                    </Form.Item>
                    <Form.Item style={{textAlign: 'center'}}>
                        <Button type="primary" htmlType="submit">Add Post</Button>
                    </Form.Item>
                </Form>
            </Fragment>
        );
    };
}

export default connect(
    state => ({
        state
    }),
    {addTweet}
)(Form.create({name: 'addItem'})(ItemAddingForm));