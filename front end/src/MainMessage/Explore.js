import React from 'react'

import {Card, Row, Col} from 'antd'

import * as EleModal from './EleModal'

export default class Explore extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            api: 'http://localhost:8080/user/explore',
            data: [],
            modalKey: -1,
        };
        this.get.bind(this);
    }

    componentDidMount() {
        this.get();
    }

    get() {
        fetch(this.state.api, {
            credentials: "include"
        })
            .then(response => response.json())
            .then((responseJson) => {
                let messages = responseJson;
                if (messages != null && messages.length !== 0) {
                    let data = this.state.data;
                    let key=0;
                    for (let message of messages) {
                        data.push({
                            ele: message,
                            // user: message.user,
                            key: key++,
                        });
                    }
                    this.setState({
                        data: data
                    })
                }
            })
    }

    avatarPrepath = 'http://localhost:8080/images/';

    render() {
        const eleOnclick=(key)=>{
            this.setState({
                modalKey: this.state.modalKey>=0?-1:key
            })
        };
        let items = [];
        let data = this.state.data;
        const RenderItem = (data) => {
            return (
                <Card
                    cover={<img src={this.avatarPrepath + data.ele.source} onClick={eleOnclick.bind(this,data.key)}/>}
                    hoverable={true}
                >
                    {data.ele.description}
                </Card>
            )
        };
        let len = this.state.data.length;
        let d=new Array(4);
        for (let i = 0; i < len;) {
            for (let j=0;j<4;++j) {
                if(i===len)
                    d[j]=null;
                else {
                    d[j]=RenderItem(data[i]);
                    ++i;
                }
            }
            items.push(
                <Row gutter={24} type='flex' align='top'>
                    <Col span={6} xs >{d[0]}</Col>
                    <Col span={6} xs >{d[1]}</Col>
                    <Col span={6} xs >{d[2]}</Col>
                    <Col span={6} xs >{d[3]}</Col>
                </Row>
            );
        }
        let key=this.state.modalKey;
        let ele=null;
        if(key>=0)
            ele=data[key];
        return (
            <div>
                {EleModal.EleModal(ele,eleOnclick.bind(this))}
                {items}
            </div>
        )
    }
}