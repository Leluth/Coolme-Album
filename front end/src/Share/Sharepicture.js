import React, { Component } from 'react';

import {Form, Upload, Icon, message} from 'antd';
import 'antd/dist/antd.css';

import '../index.css'


const FormItem = Form.Item;

class Sharepicture extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classname: 'sharebox',
            handleChange: props.handleChange,
        };
    }

    shareActiveIn() {
        this.setState({classname: 'sharebox_active'})
    }

    shareActiveOut() {
        this.setState({classname: 'sharebox'})
    }

    normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 14},
        };
        return (
            <FormItem
                {...formItemLayout}
            >
                <div className="dropbox" style={{width: 400}}>
                    {getFieldDecorator('dragger', {
                        valuePropName: 'fileList',
                        getValueFromEvent: this.normFile,
                    })(
                        <Upload.Dragger name="file" action={'1.2.4.8'} onChange={this.state.handleChange}>
                            <div className={this.state.classname} onMouseMove={this.shareActiveIn.bind(this)}
                                 onMouseOut={this.shareActiveOut.bind(this)}>
                                <Icon type="bulb" style={{fontSize: '12em'}}/>
                                <div className="ant-upload-text" style={{fontSize: '3em', marginTop: 20}}>Share
                                    Pictures
                                </div>
                            </div>
                        </Upload.Dragger>
                    )}
                </div>
            </FormItem>
        );
    }
}

const Sharepictureform = Form.create()(Sharepicture);
export default Sharepictureform;