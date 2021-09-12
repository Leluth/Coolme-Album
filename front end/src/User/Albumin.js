import React, { Component } from 'react';

import { Layout, Menu, Breadcrumb, Icon, Tabs, Card, Upload, Modal, Col, Row } from 'antd';

import 'antd/dist/antd.css';

import {EleModal} from "../MainMessage/EleModal";


const { Header, Content, Footer, Sider } = Layout;
const TabPane = Tabs.TabPane;
const { Meta } = Card;
const str="http://localhost:8080/images/";

function Rowthree(props) {
    return (
    <Row gutter={16}>
        <Col span={8} >
            <Card
                hoverable
                style={{ width: 250 }}
                cover={<img  alt="example" src={str+props.data[props.id].source}/>}
            >
                <Meta
                    title={props.data[props.id].description}
                />
            </Card>
        </Col>
        <Col span={8}>
            <Card
                hoverable
                style={{ width: 250 }}
                cover={<img  alt="example" src={str+props.data[props.id + 1].source} />}
            >
                <Meta
                    title={props.data[props.id + 1].description}
                />
            </Card>
        </Col>
        <Col span={8}>
            <Card
                hoverable
                style={{ width: 250 }}
                cover={<img  alt="example" src={str+props.data[props.id + 2].source} />}
            >
                <Meta
                    title={props.data[props.id + 2].description}
                />
            </Card>
        </Col>
    </Row>
    )
}
function Rowtwo(props) {
    return (
    <Row gutter={16}>
        <Col span={8} >
            <Card
                hoverable
                style={{ width: 250 }}
                cover={<img  alt="example" src={str+props.data[props.id].source}/>}

            >
                <Meta
                    title={props.data[props.id].description}
                />
            </Card>
        </Col>
        <Col span={8}>
            <Card
                hoverable
                style={{ width: 250 }}
                cover={<img  alt="example" src={str+props.data[props.id + 1].source} />}
            >
                <Meta
                    title={props.data[props.id + 1].description}
                />
            </Card>
        </Col>
    </Row>
    )
}
function Rowone(props) {
    return  (
    <Row gutter={16}>
        <Col span={8} >
            <Card
                hoverable
                style={{ width: 250 }}
                cover={<img  alt="example" src={str+props.data[props.id].source}/>}
            >
                <Meta
                    title={props.data[props.id].description}
                />
            </Card>
        </Col>
    </Row>
    )
}


class Albumin extends Component {
    constructor(props){
        super(props);
        this.state= {
            data: [],
            ok: false,
            //state可按需求进行更改
            showEle: -1,
        }
    }

    componentWillReceiveProps(props) {
        let album = props.album;
        this.setState({data: album.eleList});
    }

    render() {
        const EleClick=(key)=>{
            this.setState({
                showEle: this.state.showEle>=0?-1:key
            })
        };
        const RenderEle=(ele,key)=> {
            if (ele != null)
                return (
                    <Col span={6}>
                        <Card hoverable={true} cover={<img src={str + ele.source} onClick={EleClick.bind(this,key)}/>}>
                            <Card.Meta description={ele.description}/>
                        </Card>
                    </Col>
                )
        };
        let rs = [];
        let data=this.state.data;
        let length=data.length;
        for (let i=0;i<length;i+=4) {
            let es = [];
            for (let j = 0; (j < 4) && (i + j) < length; ++j)
                es.push(RenderEle(data[i + j], i + j))
            rs.push(
                <Row gutter={16}>
                    {es}
                </Row>
            )
        }
        let ele=null;
        let key=this.state.showEle;
        if(key>=0)
            ele=data[key];
        return (
            <div>
                {EleModal(ele!=null?{ele: ele}:null,EleClick.bind(this))}
                {rs}
            </div>
        );
    }
}


export default Albumin;