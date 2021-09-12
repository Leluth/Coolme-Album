import React from 'react'

import {Card, Row, Col, Icon, Input, Dropdown, Menu, Modal, Avatar, Layout, Divider} from 'antd'
// import 'antd/dist/antd.css'

import {Link, withRouter} from 'react-router-dom'


export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            api: 'http://localhost:8080/user/main',
            likeApi: 'http://localhost:8080/user/like',
            unlikeApi: 'http://localhost:8080/user/like/cancel',
            commentApi: 'http://localhost:8080/user/comment',
            getCommentsApi: 'http://localhost:8080/user/elecomments',
            followingsApi: 'http://localhost:8080/user/followings',
            userSkechApi: 'http://localhost:8080/user/skech',
            followingList: [],
            data: [],
            modalKey: -1,
        };
        /*
        this.update.bind(this);
        this.get.bind(this);
        this.like.bind(this);
        this.comment.bind(this);
        this.showComments.bind(this);
        this.RenderComments.bind(this);
        */
    }

    componentDidMount() {
        this.get();
        this.getFollowings()
    }

    update(props) {

    }

    get() {
        fetch(this.state.api,{
            credentials: "include"
        })
            .then(response=>response.json())
            .then((responseJson)=>{
                let messages=responseJson;
                if(messages!=null&&messages.length!==0) {
                    let data = this.state.data;
                    let key=0;
                    for (let message of messages) {
                        data.push({
                            ele: message.ele,
                            user: message.user,
                            like: message.likingEle?'heart':'heart-o',
                            showComments: false,
                            comment: '',
                            key: key++,
                        });
                    }
                    this.setState({
                        data: data
                    })
                }
            })
    }

    like(key) {
        let data=this.state.data;
        let type=data[key].like;
        let api='';
        if(type==='heart-o') {
            data[key].like='heart';
            api=this.state.likeApi;
        }
        else if(type==='heart') {
            data[key].like='heart-o';
            api=this.state.unlikeApi;
        }
        fetch(api+'?eleid='+data[key].ele.eleid,{
            credentials: "include"
        })
            .then(response=>response.json())
            .then((responseJson)=>{
                if(responseJson>0)
                    this.setState({
                        data: data
                    })
            })
    }

    showComments(key) {
        let data=this.state.data;
        data[key].showComments=data[key].showComments !== true;
        fetch(this.state.getCommentsApi+'?eleid='+data[key].ele.eleid,{
            credentials: "include"
        })
            .then(response=>response.json())
            .then((responseJson)=>{
                data[key].ele.comments=responseJson;
                this.setState({
                    data: data
                })
            })
    }

    c=(comments)=>(
        // todo
        <Card.Grid
            style={{
                width: '100%',
                textAlign: 'left'
            }}
        >
            {comments}
        </Card.Grid>
    );

    comment(key,e) {
        e.preventDefault();
        let value=e.target.value;
        let data=this.state.data;
        fetch(this.state.commentApi+
            '?eleid='+data[key].ele.eleid+
            '&comments='+value+
            '&tarid=1',{
            credentials: "include"
        })
            .then(reponse=>reponse.json())
            .then((responseJson)=>{
                if(responseJson>0) {
                    data[key].ele.comments.push({
                        // todo
                        // userid: data.user.userid,
                        comments: value,
                    });
                    data[key].comment='';
                    this.setState({
                        data: data
                    })
                }
            })
    }

    EleOnclick(key) {
        this.setState({
            modalKey: this.state.modalKey >= 0 ? -1 : key
        })
    }

    RenderComments(key) {
        let cs=[];
        let data=this.state.data;
        if(data[key].ele.comments!=null) {
            for (let comment of data[key].ele.comments) {
                cs.push(
                    this.c(comment.comments)
                )
            }
            cs.push(
                <Input.TextArea
                    value={data[key].comment}
                    placeholder='your comments'
                    autosize={{minRows: 1, maxRows: 4}}
                    onChange={(e) => {
                        e.preventDefault();
                        let data = this.state.data;
                        data[key].comment = e.target.value;
                        this.setState({
                            data: data
                        })
                    }}
                    onPressEnter={(e) => {
                        this.comment(key, e)
                    }}
                />
            );
            return cs;
        }
    }

    getFollowings() {
        fetch(this.state.followingsApi,{
            credentials: "include"
        })
            .then(response=>response.json())
            .then((responseJson)=>{
                for (let id of responseJson) {
                    fetch(this.state.userSkechApi+'?userid='+id,{
                        credentials: "include"
                    })
                        .then(res=>res.json())
                        .then((resJson)=>{
                            let list=this.state.followingList;
                            list.push(resJson);
                            this.setState({
                                followingList: list
                            })
                        })
                }
            })
    }

    RenderFollowings=()=> {
        let list = this.state.followingList;
        let ls = [];
        for (let user of list) {
            ls.push(
                <Menu.Item key={user.userid}>
                    <Avatar src={this.avatarPrepath + user.avatar}/>
                    {user.username}
                    <Link to={'/page/other/' + user.userid}>{'go'}</Link>
                </Menu.Item>
            )
        }
        return ls;
    };

    avatarPrepath='http://localhost:8080/images/';

    render() {
        let RenderComments = this.RenderComments.bind(this);
        let items = [];
        for (let data of this.state.data) {
            items.push(
                <Row>
                    <Col offset={2} span={12}>
                        <Card
                            cover={<img src={this.avatarPrepath + data.ele.source}
                                        onClick={this.EleOnclick.bind(this, data.key)}/>}
                            hoverable={true}
                            //loading={true}
                            actions={[
                                <Icon type={data.like}
                                      style={data.like === 'heart' ? {color: '#FF6666'} : null}
                                      onClick={this.like.bind(this, data.key)}
                                />,
                                <Icon type="message"
                                      style={{}}
                                      onClick={this.showComments.bind(this, data.key)}
                                />,
                                <Icon type="share-alt"
                                      onClick={null}
                                />,
                            ]}
                        >
                            {data.ele.description}
                            <Link to={'/page/other/' + data.user.userid}>
                                <Card.Meta
                                    avatar={<Avatar src={this.avatarPrepath + data.user.avatar}/>}
                                    title={data.user.username}
                                />
                            </Link>
                            <div
                                style={data.showComments === true ? null : {display: 'none'}}
                            >
                                {RenderComments(data.key)}
                            </div>
                        </Card>
                    </Col>
                </Row>
            )
        }
        const EleModal = (key) => {
            let data = this.state.data;
            if (data.length > 0 && key >= 0) {
                return (
                    <Modal visible={key >= 0}
                        // closable={false}
                           footer={null}
                           onCancel={this.EleOnclick.bind(this, -1)}
                           width='75%'
                           bodyStyle={{
                               // backgroundcolor: 'rgba(0,0,0,0.5)'
                           }}
                    >
                        <Card cover={<img src={this.avatarPrepath + data[key].ele.source}/>}
                              hoverable={true}
                        >
                            <Card.Meta description={data[key].ele.description}/>
                        </Card>
                    </Modal>
                )
            }
        };
        const infoCard = () => (
            <Layout>
                <Layout.Sider style={{ width: '400px', position: 'fixed', left: '70%' }}>
                    <Menu mode="inline">
                        {this.RenderFollowings.bind(this)()}
                    </Menu>
                </Layout.Sider>
            </Layout>
        );

        return (
            <div>
                {infoCard.bind(this)()}
                {EleModal(this.state.modalKey)}
                {items}
            </div>
        )
    }}