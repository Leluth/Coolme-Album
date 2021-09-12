import React, { Component } from 'react';

import { Form, Icon, Input, Button, Checkbox } from 'antd';

import {Link, withRouter} from 'react-router-dom'

import './login.css'




const FormItem = Form.Item;

class NormalSignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {userName: "", password: "", remember: true};
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    //  componentDidMount(){
    // }
    handleSubmit = (e) => {
        e.preventDefault();
        var func = this.props.onLogin;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                var username = document.signupform.username.value;
                var password = document.signupform.password.value;
                var passworda = document.signupform.passworda.value;
                let formData = new FormData();
                formData.append('username', username);
                formData.append('password', password);
                let history=this.props.history;
                if (password === passworda) {
                    fetch("http://localhost:8080/user/account/signup", {
                        method: 'POST',
                        credentials: "include",
                        body: formData,
                    })
                        .then(response => response.json())
                        .then((responseJson) => {
                            if(responseJson>0) {
                                document.cookie=username+','+password;;
                                alert("注册成功，正在登录。");
                                history.push('/login');
                            }
                            else {
                                alert('注册失败');
                                history.push('/signup');
                            }
                        });
                }
                else {
                    alert("两次密码输入不一致，请重新输入。");
                    history.push('/signup');
                }
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className={"div"}>
                <h3 className="title">CoolMe Album</h3>
                <Form onSubmit={(e)=>this.handleSubmit(e)} className="login-form" name="signupform">
                    <FormItem>
                        {getFieldDecorator('userName', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" name="username" id="loginusername"/>
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" name="password" id="loginpassword" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('Confirm password', {
                            rules: [{ required: true, message: 'Please input your Password again!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Confirm Password" name="passworda" id="loginpassworda" />
                        )}
                    </FormItem>
                    <br/>
                    <FormItem>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(
                            <Checkbox>Remember me</Checkbox>
                        )}
                        <br/>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Sign up
                        </Button>
                        <br/>
                        <Link to='/login'>Back</Link>
                    </FormItem>
                </Form>
            </div>
        );
    }
}


const WrappedNormalSignupForm = Form.create()(NormalSignupForm);

export default withRouter(WrappedNormalSignupForm);