import React, { Component } from 'react';

import { Layout, Menu, Icon, Divider, Input, Popover, Card, Button, Avatar, Row, BackTop } from 'antd';
import 'antd/dist/antd.css';

import {Link, withRouter} from 'react-router-dom'

import '../index.css'

import {AvatarPrepath} from "../Utils/Constant";


const { Header } = Layout;
const Search = Input.Search;

class Headerdemo extends Component {
    constructor(props) {
        super(props);
        this.state={
            likesApi: 'http://localhost:8080/user/like/likes',
            likesData: [],
        }
    }

    getLikes() {
        fetch(this.state.likesApi,{
            credentials: "include"
        })
            .then(response=>response.json())
            .then((responseJson)=>{
                this.setState({
                    likesData: responseJson
                })
            })
    }

    render() {
        const RenderLikes = () => {
            let ds = [];
            for (let data of this.state.likesData) {
                ds.push(
                    <Row>
                        <Card.Grid
                            style={{
                                width: '100%',
                                textAlign: 'left',
                                // height: '10%',
                            }}
                        >
                            <div>
                                <Avatar src={AvatarPrepath + data.source}/>
                                {data.description}
                            </div>
                        </Card.Grid>
                    </Row>
                )
            }
            return ds.length>0?ds:'nothing to show here, see more in explore!';
        };
        return (
            <div style={{width: '100%', height: 80}}>
                <Header className="boder"
                        style={{background: '#fff', position: 'fixed', zIndex: 1, width: '100%', height: 80}}>
                    <Link to='/page/share'><Icon type="instagram"
                                                 style={{paddingLeft: '5%', fontSize: 50, color: '#000000', margin: 10}}/>
                    </Link>
                    <Divider type="vertical" style={{height: 40}}/>
                    <Link to='/page/main'><a href="#" style={{
                        paddingLeft: '1%',
                        color: '#000000',
                        fontSize: '2.4em'
                    }}>CoolMeAlbum</a></Link>
                    <Search
                        placeholder="input search text"
                        onSearch={(value) => {console.log(value);this.props.history.push('/page/explore')}}
                        style={{marginLeft: '15%', width: 200}}
                    />
                    <Menu
                        theme="white"
                        mode="horizontal"
                        //defaultSelectedKeys={['3']}
                        style={{paddingRight: '10%', lineHeight: '80px', float: 'right', height: 80}}
                    >
                        <Menu.Item key="1">
                            <Link to='/page/explore'>
                                <Icon type="compass" style={{fontSize: '1.4em'}}/>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Popover placement='bottom' content={RenderLikes.bind(this)()} onMouseEnter={this.getLikes.bind(this)}>
                            <Icon type="heart-o" style={{fontSize: '1.4em'}}/>
                            </Popover>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Link to='/page/user'>
                                <Icon type="user" style={{fontSize: '1.4em'}}/>
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Header>
                <BackTop>
                    <div className="backtop"><Icon type="arrow-up" /></div>
                </BackTop>
            </div>
        );
    }
}

export default withRouter(Headerdemo);