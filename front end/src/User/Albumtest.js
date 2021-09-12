import React, { Component } from 'react';

import { Layout, Menu, Breadcrumb, Icon, Tabs, Card, Divider } from 'antd';

import 'antd/dist/antd.css';

import Albumin from "./Albumin";


const { Header, Content, Footer, Sider } = Layout;
const TabPane = Tabs.TabPane;

class Album extends Component {
    constructor(props) {
        super(props);
        // this.update.bind(this);
        // this.update(props);
        this.state={
            album: null,
        }
    }

    componentWillReceiveProps(props) {
        this.update(props);

    }

    update(props) {
        this.setState({
            album: props.album != null ? props.album : ({albumname: '', eleList: []})
        })
    }


    render() {
        let album = this.state.album;
        return (
            <Layout className="indexback">
                <Divider/>
                <Tabs defaultActiveKey="1">
                    <TabPane tab={<span><Icon type="picture"/>{album != null ? album.albumname : ''}</span>} key="1">
                        <Albumin album={album != null ? album : {albumname: '', eleList: []}}/>
                    </TabPane>
                </Tabs>
            </Layout>
        );
    }
}

export default Album;