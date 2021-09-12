import React, { Component } from 'react'

import { Layout, Menu, Breadcrumb, Icon, Divider, Input } from 'antd'
import 'antd/dist/antd.css'

import Headerdemo from '../Headerdemo/Headerdemo'
import Userheader from './Userheader'
import Userfoot from './Userfoot'


const { Header, Content, Footer, Sider } = Layout;
const Search = Input.Search;

class OtherUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            api: 'http://localhost:8080/user',
            otherId: props.match.params.id,
            // user: null,
            avatar: null,
            username: null,
            followers: null,
            followings: null,
            profile: null,
            friendsid: [],
            albums: [],
        };
        // this.get.bind(this)
    }

    componentDidMount() {
        this.get()
    }

    get() {
        fetch(this.state.api+'?userid='+this.state.otherId, {
            credentials: "include"
        })
            .then(response => response.json())
            .then((responseJson) => {
                if (responseJson != null && responseJson.userid > 0) {
                    let user = responseJson;
                    this.setState({
                        //user: responseJson,
                        avatar: user.avatar,
                        username: user.username,
                        followers: user.followers,
                        followings: user.followings,
                        profile: null,
                        friendsid: responseJson.friendsid,
                        albums: responseJson.albums,
                    })
                }
            }).then(()=> {
            // todo
        })
    }

    avatarPrepath='http://localhost:8080/images/';

    render() {
        return (
            <div>
                <Userheader
                    avatar={this.avatarPrepath+this.state.avatar}
                    username={this.state.username}
                    followers={this.state.followers}
                    followings={this.state.followings}
                    profile='然而并没有个人简介~'
                    friendsid={this.state.friendsid}
                    albums={this.state.albums}
                />
                <Userfoot/>
            </div>
        );
    }
}

export default OtherUser;