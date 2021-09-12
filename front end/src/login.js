import React, { Component } from 'react';

import { Form, Icon, Input, Button, Checkbox } from 'antd';

import {Link, withRouter} from 'react-router-dom'

import './login.css'


const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {userName: "", password: "", remember: true};
    }

     componentWillMount(){
        if(document.cookie!=='null'&&document.cookie!==''){
            var list=document.cookie.split(',');
         var username = list[0];
         var password = list[1];
         let formData = new FormData();
         formData.append('username', username);
         formData.append('password', password);

            fetch("http://localhost:8080/user/account/login", {
                method: 'POST',
                credentials: "include",
                body: formData,
            })
                .then(response => response.json())
                .then((responseJson) => {
                    let url = responseJson > 0 ? '/page/main' : '/login';
                    this.props.history.push(url);
                });
        }
     }
    handleSubmit = (e) => {
        e.preventDefault();
        // var func = this.props.onLogin;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                var username = document.loginform.username.value;
                var password = document.loginform.password.value;
                let formData = new FormData();
                formData.append('username', username);
                formData.append('password', password);
                fetch("http://localhost:8080/user/account/login", {
                    method: 'POST',
                    credentials: "include",
                    body: formData,
                })
                    .then(response => response.json())
                    .then((responseJson) => {
                            document.cookie=username+','+password;
                        let url = responseJson > 0 ? '/page/main' : '/login';
                        this.props.history.push(url);
                    });
            }
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div className={"div"}>
                <h3 className="title">CoolMe Album</h3>
                <Form onSubmit={(e)=>this.handleSubmit(e)} className="login-form" name="loginform">
                    <FormItem>
                        {getFieldDecorator('userName', {
                            rules: [{required: true, message: 'Please input your username!'}],
                        })(
                            <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                   placeholder="Username" name="username" id="loginusername"/>
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{required: true, message: 'Please input your Password!'}],
                        })(
                            <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                                   placeholder="Password" name="password" id="loginpassword"/>
                        )}
                    </FormItem>
                    <br/>
                    <FormItem>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(
                            <Checkbox name='remember' id="remember">Remember me</Checkbox>
                        )}
                        <a className="login-form-forgot" href="https://www.baidu.com">Solve all your problem.</a>
                        <br/>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                        <br/>
                        Or <Link to='/signup'>register now!</Link>
                    </FormItem>
                </Form>
            </div>
        );
    }
}


const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default withRouter(WrappedNormalLoginForm);