import React, {Component} from 'react';
import {Button, Form, Mentions} from 'antd';
import {connect} from 'react-redux';
import {updateTweet, getHashTags, getMentions} from '../../store/tweet/tweetActions';
import debounce from "lodash/debounce";

class ItemEditingForm extends Component {
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
                        tags: tags.payload.data,
                        loading: false,
                        prefix
                    });

                    break;
                case '@':
                    const mentions = await this.props.getMentions(key);

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

    onUpdateItem = (e) => {
        const {id, updateTweet} = this.props;

        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                updateTweet(id, values.content);
                this.props.toggleFormVisibility();
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
                this.onUpdateItem( e );
            }
        }
    };

    render () {
        const {content} = this.props;
        const {Option} = Mentions;
        const {getFieldDecorator} = this.props.form;
        const {prefix, tags, mentions, loading} = this.state;

        return (
            <Form onSubmit={this.onUpdateItem}>
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
                    <Button type="primary" htmlType="submit">Edit tweet</Button>
                </Form.Item>
            </Form>
        )
    }
}

export default connect(null, {
    updateTweet,
    getHashTags,
    getMentions
})(Form.create({name: 'listItemForm'})(ItemEditingForm));