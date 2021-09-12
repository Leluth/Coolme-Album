import React, { Component } from 'react';

/*npm install reqwest --save-dev*/
// import reqwest from 'reqwest';

/*npm install react-virtualized --save*/
import WindowScroller from 'react-virtualized/dist/commonjs/WindowScroller';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import VList from 'react-virtualized/dist/commonjs/List';
import InfiniteLoader from 'react-virtualized/dist/commonjs/InfiniteLoader';

import { List, Avatar, Spin } from 'antd';

import Followingbutton from './Followingbutton'


// const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';

class Friendslist extends Component {
    constructor(props) {
        super(props);

        this.state={
            api: 'http://localhost:8080/user/skech?userid=',
            loading: false,
            data: []
        };
        this.update.bind(this);
        this.getData.bind(this);
        this.update(props);
    }

    loadedRowsMap = {};

    componentWillReceiveProps(props) {
        this.update(props)
    }

    getData(id) {
        /*
        reqwest({
            url: fakeDataUrl,
            type: 'json',
            method: 'get',
            contentType: 'application/json',
            success: (res) => {
                callback(res);
            },
        });
        */

        // todo

        let friend=null;
        fetch(this.state.api+id,{
            credentials: "include"
        })
            .then(response=>response.json())
            .then((responseJson)=>{
                friend=responseJson;
                let data=this.state.data;
                data.push(friend);
                this.setState({
                    data: data
                });
                console.log(this.state)
            })
    };

    update(props) {
        let friendsid=props.friendsid;
        let data = [];
        if(friendsid!=null&&friendsid.length!==0) {
            for (let id of friendsid) {
                this.getData(id)
            }
        }
    }

    componentDidMount() {
        /*
        this.getData((res) => {
            this.setState({
                data: res.results,
            });
        });
        */
    }

    handleInfiniteOnLoad = ({ startIndex, stopIndex }) => {
        let data = this.state.data;
        this.setState({
            loading: true,
        });
        for (let i = startIndex; i <= stopIndex; i++) {
            // 1 means loading
            this.loadedRowsMap[i] = 1;
        }
        if (data.length >19) {
            this.setState({
                loading: false,
            });
            return;
        }
        /*
        this.getData((res) => {
            data = data.concat(res.results);
            this.setState({
                data,
                loading: false,
            });
        });
        */
    };

    avatarPrepath='http://localhost:8080/images/';

    isRowLoaded = ({ index }) => {
        return !!this.loadedRowsMap[index];
    };

    renderItem = ({ index, key, style }) => {
        const { data } = this.state;
        const item = data[index];
        return (
            <List.Item key={key} style={style}>
                <List.Item.Meta
                    avatar={<Avatar src={this.avatarPrepath+item.avatar} />}
                    title={<a href="https://ant.design">{item.username}</a>}
                    description='There is no description!'
                />
                <div><Followingbutton/></div>
            </List.Item>
        );
    };

    render() {
        const { data } = this.state;
        const vlist = ({ height, isScrolling, onChildScroll, scrollTop, onRowsRendered, width }) => (
            <VList
                autoHeight
                height={height}
                isScrolling={isScrolling}
                onScroll={onChildScroll}
                overscanRowCount={2}
                rowCount={data.length}
                rowHeight={73}
                rowRenderer={this.renderItem}
                onRowsRendered={onRowsRendered}
                scrollTop={scrollTop}
                width={width}
            />
        );
        const autoSize = ({ height, isScrolling, onChildScroll, scrollTop, onRowsRendered }) => (
            <AutoSizer disableHeight>
                {({ width }) => vlist({ height, isScrolling, onChildScroll, scrollTop, onRowsRendered, width })}
            </AutoSizer>
        );
        const infiniteLoader = ({ height, isScrolling, onChildScroll, scrollTop }) => (
            <InfiniteLoader
                isRowLoaded={this.isRowLoaded}
                loadMoreRows={this.handleInfiniteOnLoad}
                rowCount={data.length}
            >
                {({ onRowsRendered }) => autoSize({ height, isScrolling, onChildScroll, scrollTop, onRowsRendered })}
            </InfiniteLoader>
        );
        return (
            <List>
                {
                    data.length > 0 && (
                        <WindowScroller>
                            {infiniteLoader}
                        </WindowScroller>
                    )
                }
            </List>
        );
    }
}

export default Friendslist;