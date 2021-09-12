import React, { Component } from 'react';

import { Layout, Icon, Tabs, Card, Col, Row } from 'antd';
import 'antd/dist/antd.css';

import {withRouter} from 'react-router-dom'

import '../index.css'

import Whitealbum2 from "./Whitealbum2";
import Friendslist from "./Friendslist";


const { Header,} = Layout;
const TabPane = Tabs.TabPane;

class Userheader extends Component {
    constructor(props) {
        super(props);
        this.state={
            avatar: props.avatar,
            username: props.username,
            followers: props.followers,
            followings: props.followings,
            profile: props.profile,
            friendsid: props.friendsid,
            albums: props.albums,
        };
        this.update.bind(this);
    }

    componentWillReceiveProps(props) {
        this.update(props)
    }

    update(props) {
        this.setState({
            avatar: props.avatar,
            username: props.username,
            followers: props.followers,
            followings: props.followings,
            profile: props.profile,
            friendsid: props.friendsid,
            albums: props.albums,
        })
    }

    render() {
        return (
            <Layout className="indexback">
                <div style={{width:500, background: '#fafafa', padding: '0px',marginLeft:'30%',marginTop:50 }}>
                    <Row>
                        <Col span={12}>
                            <Card
                                bordered={false}
                                style={{ width: 200,backgroundColor:'#fafafa' }}
                                cover={<img alt="example" src={this.state.avatar} />}
                            >
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card title={this.state.username}
                                  bordered={false}
                                  style={{ width: 300 ,backgroundColor:'#fafafa'}}
                                  actions={[<Icon type="edit" />, <Icon type="poweroff" onClick={()=>{document.cookie='null';this.props.history.push('/login')}}/>]}>
                                <p>{this.state.followers} 粉丝</p>
                                <p>{this.state.followings} 关注</p>
                                <p>个人简介： {this.state.profile}</p>
                            </Card>
                        </Col>
                    </Row>
                </div>
                <div style={{marginLeft:'23%',width:800, background: '#fafafa', padding: '0px',textAlign: 'center'}}>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab={<span><Icon type="picture" />我的相册</span>} key="1">
                            <Whitealbum2 albums={this.state.albums}/>
                        </TabPane>
                        <TabPane tab={<span><Icon type="team" />好友列表</span>} key="2">
                            <Friendslist friendsid={this.state.friendsid}/>
                        </TabPane>
                    </Tabs>
                </div>
            </Layout>
        );
    }
}

export default withRouter(Userheader);