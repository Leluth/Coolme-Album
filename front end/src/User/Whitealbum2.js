import React, { Component } from 'react';

import { Card, Col, Row } from 'antd';
import 'antd/dist/antd.css';

import '../index.css'

import Album from './Albumtest'
import {AvatarPrepath} from '../Utils/Constant'


const { Meta } = Card;

class Whitealbum2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            albums: [],
            albumKey: -1,
        };
        this.update.bind(this)
    }

    update(props) {
        this.setState({
            albums: props.albums
        })
    }

    componentWillReceiveProps(props) {
        this.update(props)
    }

    render() {
        const RenderAlbums=()=>{
            let as=[];
            let key=0;
            for (let album of this.state.albums) {
                let cover="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png";
                if(album.length>0)
                    cover=AvatarPrepath+album[0].source;
                as.push(
                    <Col span={8}>
                        <Card
                            hoverable
                            style={{width: 250}}
                            cover={<img alt='' src={cover} onClick={()=>{this.setState({albumKey:key++})}}/>}
                        >
                            <Meta
                                title={album.albumname}
                            />
                        </Card>
                    </Col>
                )
            }
            return as;
        };
        // todo add <Album/> to bottom
        return (
            <div>
                <div style={{width: '100%', background: '#fafafa'}}>
                    <Row gutter={32}>
                        {RenderAlbums.bind(this)()}
                    </Row>
                </div>
                <Album album={this.state.albumKey>=0?this.state.albums[this.state.albumKey]:null}/>
            </div>
        );
    }
}

export default Whitealbum2;