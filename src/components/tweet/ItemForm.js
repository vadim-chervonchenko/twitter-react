import React, {Component} from 'react';
import {Button, Form, Mentions} from 'antd';
import {connect} from 'react-redux';
import { getHashTags, getMentions, addTweet, updateTweet } from '../../store/tweet/tweetActions';
import debounce from 'lodash/debounce';

class ItemForm extends Component {
    state = {
        search: '',
        loading: false,
        tags: [],
        mentions: [],
        prefix: '#'
    };

    loadMentionTagData = debounce(async (key, prefix) => {
        const {search} = this.state;
        const { getHashTags, getMentions } = this.props;

        try {
            switch (prefix) {
                case '#':
                    const tags = await getHashTags(key);

                    if (search !== key) return;
                    this.setState({
                        tags: tags.payload.data,
                        loading: false,
                        prefix
                    });

                    break;
                case '@':
                    const mentions = await getMentions(key);

                    if (search !== key) return;
                    this.setState({
                        mentions: mentions.payload.data,
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

    onActionItem = (e) => {
        const {id = 0, addTweet, updateTweet, formType = 'add'} = this.props;

        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                switch(formType) {
                    case 'add':
                        addTweet(values.content);
                        this.props.form.resetFields();
                        break;
                    case 'edit':
                        updateTweet(id, values.content);
                        this.props.toggleFormVisibility();
                        break;
                    default:
                        break;
                }
            }
        });
    };

    onPressEnter = (e) => {
        if (e.key === 'Enter') {
            if ( e.ctrlKey || e.metaKey ) {
                const value = this.props.form.getFieldValue( 'content' );
                this.props.form.setFieldsValue( {
                    content: value + '\n',
                } );
            } else {
                this.onActionItem( e );
            }
        }
    };

    render () {
        const {content = '', submitButtonName = '', submitButtonPosition = "left"} = this.props;

        const {Option} = Mentions;
        const {getFieldDecorator} = this.props.form;
        const {prefix, tags, mentions, loading} = this.state;

        return (
            <Form onSubmit={this.onActionItem}>
                <Form.Item>
                    {getFieldDecorator('content', {
                        rules: [{required: true, message: 'Please input post content', whitespace: true, min: 1}],
                        initialValue: content
                    })(
                        <Mentions
                            rows="4"
                            loading={loading}
                            placeholder="Put your text here"
                            autoFocus
                            onKeyPress={this.onPressEnter}
                            style={{width: '100%'}}
                            prefix={['@', '#']}
                            onSearch={this.onSearch}
                        >
                            {(prefix === '#') ?
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
                                ))}
                        </Mentions>
                    )}
                </Form.Item>
                <Form.Item style={{textAlign: submitButtonPosition}}>
                    <Button type="primary" htmlType="submit">{submitButtonName}</Button>
                </Form.Item>
            </Form>
        )
    }
}

export default connect(null, { getHashTags, getMentions, updateTweet, addTweet })(Form.create({name: 'ItemForm'})(ItemForm));