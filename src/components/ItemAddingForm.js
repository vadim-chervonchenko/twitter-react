import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Form, Button} from 'antd';
import {addTweet} from '../store/tweet/tweetActions';
import {setError} from '../store/error/errorActions';
import {Mentions} from 'antd';

class ItemAddingForm extends Component {
    state = {
        prefix: '@',
        mockData: {
            '@': ['afc163', 'zombiej', 'yesmeck', 'af163', 'zombej', 'ysmeck'],
            '#': ['1.0', '2.0', '3.0'],
        }
    };

    onSearch = (_, prefix) => {
        this.setState({prefix});
    };


    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.addTweet(values.content);
            } else {

                /*  это нужно куда то вынести в отдельный функционал, если это воообще можно будет сделать. */

                let errors = [];

                for ( const error of err.content.errors ) {
                    errors.push(error.message);
                }

               this.props.setError(errors);
            }
        });
        this.props.form.resetFields();
    };

    onPressEnter = (e) => {
        if (e.key === 'Enter') {
            if (e.ctrlKey || e.metaKey) {
                const value = this.props.form.getFieldValue('content');
                this.props.form.setFieldsValue({
                    content: value + '\n',
                });
            } else {
                this.handleSubmit(e);
            }
        }
    };

    render() {
        const {Option} = Mentions;
        const {getFieldDecorator} = this.props.form;

        return (
            <Form
                onSubmit={this.handleSubmit}>
                <Form.Item>
                    {getFieldDecorator('content', {
                        rules: [{required: true, message: 'Please input post content', whitespace: true, min: 1}],
                        initialValue: ''
                    })(
                        <Mentions
                            rows="4"
                            placeholder="Put your text here"
                            autoFocus
                            onKeyPress={this.onPressEnter}
                            style={{width: '100%'}}
                            prefix={['@', '#']}
                            onSearch={this.onSearch}
                        >
                            {(this.state.mockData[this.state.prefix] || []).map(value => (
                                <Option key={value} value={value}>
                                    {value}
                                </Option>
                            ))}
                        </Mentions>
                    )}
                </Form.Item>
                <Form.Item style={{textAlign: 'center'}}>
                    <Button type="primary" htmlType="submit">Add Post</Button>
                </Form.Item>
            </Form>
        );
    }
}

export default connect(null, {addTweet, setError})(Form.create({name: 'addPost'})(ItemAddingForm));