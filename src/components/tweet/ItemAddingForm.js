import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Form, Button} from 'antd';
import {addTweet, getHashTags, getMentions} from '../../store/tweet/tweetActions';
import {setError} from '../../store/error/errorActions';
import {Mentions} from 'antd';
import debounce from 'lodash/debounce';

class ItemAddingForm extends Component {
    state = {
        search: '',
        loading: false,
        tags: [],
        mentions: [],
        prefix: '#'
    };

    loadMentionTagData = debounce(async (key, prefix) => {
        const {search} = this.state;

        try {
            switch (prefix) {
                case '#':
                    const tags = await this.props.getHashTags(key);

                    if (search !== key) return;
                    this.setState({
                        tags,
                        loading: false,
                        prefix
                    });

                    break;
                case '@':
                    const mentions = await this.props.getMentions(key);

                    console.log(mentions);

                    if (search !== key) return;
                    this.setState({
                        mentions,
                        loading: false,
                        prefix
                    });

                    break;
            }
        } catch (error) {
            console.log('Something went wrong', error);
        }
    }, 800);

    onSearch = (search, prefix) => {
        this.setState({search, loading: true, tags: [], mentions: []});
        this.loadMentionTagData(search, prefix);
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.addTweet(values.content);
                this.props.form.resetFields();
            }
        });
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
        const {prefix, tags, mentions} = this.state;

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
                            {
                                prefix === '#' ?
                                    tags.map(value => (
                                        <Option key={value} value={value}>
                                            {value}
                                        </Option>
                                    ))
                                    :
                                    mentions.map(value => (
                                        <Option key={value} value={value}>
                                            {value}
                                        </Option>
                                    ))
                            }
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

export default connect(null, {
    addTweet,
    setError,
    getHashTags,
    getMentions
})(Form.create({name: 'addPost'})(ItemAddingForm));