import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {updateTweet} from '../store/tweet/TweetActions';
import {Button, Input, Form} from 'antd';

class ItemEditingForm extends Component {
    state = {
        content: ''
    };

    onUpdateItem = (e) => {
        e.preventDefault();
        const {itemId, formVisibilityChange} = this.props;

        this.props.form.validateFields((err) => {
            if (!err && this.state.content !== "") {
                this.props.updateTweet(
                    itemId,
                    this.state.content
                );
            }
        });
        formVisibilityChange();
    };

    onContentChange = (e) => {
        this.setState({
            content: e.target.value
        });
    };

    render() {
        const {formVisibilityToggle} = this.props;
        const formStyle = formVisibilityToggle ? '' : 'd-none';
        const {getFieldDecorator} = this.props.form;

        return (
            <Fragment>
                <Form className={`pt-3 ${formStyle}`}
                      onSubmit={this.onUpdateItem}>
                    <Form.Item>
                        {getFieldDecorator('content', {
                            rules: [{required: true, message: 'Please input post content', whitespace: true, min: 1}],
                            initialValue: ''
                        })(
                            <Input
                                onChange={this.onContentChange}
                                placeholder="Please edit your tweet"
                                className="form-control mb-3"
                                autoFocus
                                onPressEnter={this.onPressEnter}
                            />
                        )}
                    </Form.Item>
                    <Form.Item style={{textAlign: 'center'}}>
                        <Button type="primary" htmlType="submit">Edit tweet</Button>
                    </Form.Item>
                </Form>
            </Fragment>
        );
    };
}

export default connect(
    null,
    {updateTweet}
)(Form.create({name: 'editForm'})(ItemEditingForm));