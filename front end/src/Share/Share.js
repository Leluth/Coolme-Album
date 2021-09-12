import React, { Component } from 'react';

import $ from 'jquery'

import { Tooltip,Upload, Icon, Modal,Tabs,Input,Row, Col,Select,Button} from 'antd';

import 'antd/dist/antd.css';
import '../index.css'

import Sharepictureform from './Sharepicture';
import Headerdemo from '../Headerdemo/Headerdemo';
import Userfoot from '../User/Userfoot';


const TabPane = Tabs.TabPane;
const { TextArea } = Input;
const Option = Select.Option;
const text = <span>新建相册</span>;

class Share extends Component {
    state = {
        visible: false,
        confirmLoading: false,
        previewVisible: false,
        previewImage: '',
        type:'disabled',
        size: 'default',
        uploadiconLoading_share: false,
        canceliconLoading_share: false,
        uploadiconLoading_upload: false,
        canceliconLoading_upload: false,
        fileList: [],
        api: 'http://localhost:8080/user/album/addele',
        albumid: -1,
        description: '',
        albumApi: 'http://localhost:8080/user/albums',
        albumData: [],
        createAlbumApi: 'http://localhost:8080/user/album/create',
        albumname: '',
    };

    componentDidMount() {
        this.get()
    }

    componentDidUpdate() {
        this.get()
    }

    get() {
        fetch(this.state.albumApi,{
            credentials: "include"
        })
            .then(response=>response.json())
            .then((responseJson)=>{
                if(responseJson!=null) {
                    this.setState({
                        albumid: responseJson[0].albumid,
                        albumData: responseJson,
                    })
                }
            })
    }

    uploadIconLoading_share = () => {
        if(this.state.fileList.length>0&&this.state.albumid!=null) {
            let form=new FormData();
            let state=this.state;
            form.append('albumid',state.albumid);
            form.append('file',state.fileList[0].originFileObj);
            form.append('description',state.description);
            $.ajax({
                type: 'POST',
                url: state.api,
                xhrFields: {withCredentials: true},
                contentType: false,
                processData: false,
                data: form,
                success: (res)=>{
                    if(res>0)
                        this.setState({uploadiconLoading_share: true});
                }
            })
            /*
            fetch(this.state.api, {
                credentials: "include",
                headers: {},
                //contentType: false,
                //enctype: 'multipart/form-data',
                //processData: false,
                method: 'POST',
                body: form,
            })
                .then(response => response.json())
                .then((responseJson) => {
                    if (responseJson >= 0) {
                        this.setState({uploadiconLoading_share: true});
                    }
                })
             */
        }
    };

    uploadIconLoading_upload = () => {
        if (this.state.fileList.length > 0 && this.state.albumid != null) {
            let of = [];
            for (let file of this.state.fileList)
                of.push(file.originFileObj);
            fetch(this.state.api, {
                credentials: "include",
                method: 'POST',
                body: new FormData({
                    'albumid': this.state.albumid,
                    'file': of,
                    'description': '',
                })
            })
                .then(response => response.json())
                .then((responseJson) => {
                    if (responseJson > 0)
                        this.setState({uploadiconLoading_upload: true});
                })
        }
    };

    cancelIconLoading_share = () => {
        this.setState({ canceliconLoading_share: true });
    };

    cancelIconLoading_upload = () => {
        this.setState({ canceliconLoading_upload: true });
    };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = () => {
        fetch(this.state.createAlbumApi+'?albumname='+this.state.albumname,{
            credentials: "include"
        })
            .then(response=>response.json())
            .then((responseJson)=>{
                if(responseJson>0)
                    this.setState({
                        visible: false,
                        confirmLoading: false,
                    });
            });
    };

    handleModelCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            visible: false,
        });
    };



    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    };

    handleChange = ({ fileList }) => this.setState({ fileList: fileList });
    render() {
        const { visible, confirmLoading, } = this.state;
        const size = this.state.size;
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const RenderAlbums=()=>{
            let data=this.state.albumData;
            let as=[];
            for (let d of data) {
                as.push(
                    <Option value={d.albumid}>{d.albumName}</Option>
                )
            }
            return as;
        };
        return (
            <div style={{backgroundColor:'#fafafa'}}>
                <Tabs defaultActiveKey="1" size='large' style={{textAlign: 'center'}} >
                    <TabPane tab={<span><Icon type="camera" />分享此刻</span>} key="1">
                        <div style={{marginLeft:250,width:900}}>
                            <Row>
                                <Col span={12}>
                                    <Sharepictureform handleChange={this.handleChange.bind(this)}/>
                                </Col>
                                <Col span={12} style={{textAlign:'left'}}>
                                    <div style={{width:400,margin: 20}}>
                                        <TextArea rows={4}
                                                  placeholder="分享此刻的想法！"
                                                  size="large"
                                                  onChange={(e)=>{e.preventDefault();this.setState({description:e.target.value})}}
                                        style={{height:250,fontSize:'1.2em'}}/>
                                    </div>
                                    <div style={{width:400}}>
                                        <Row style={{paddingTop:5}}>
                                            <Col span={8}>
                                        <div style={{fontSize:'1.2em',paddingLeft:20,}}>上传相册至:</div>
                                            </Col>
                                            <Col span={8}>
                                        <Select defaultValue={this.state.albumid>0?this.state.albumid:null} style={{ width: 120 }} >
                                            {RenderAlbums.bind(this)()}
                                        </Select>
                                            </Col>
                                            <Col span={8}>
                                                <Tooltip placement="top" title={text}>
                                                    <Icon type="plus-circle" style={{fontSize:16,color:'#1088e9',paddingTop:8}} onClick={this.showModal}/>
                                                    <Modal title="新建相册"
                                                           visible={visible}
                                                           onOk={this.handleOk}
                                                           confirmLoading={confirmLoading}
                                                           onCancel={this.handleModelCancel}
                                                    >
                                                        <Input placeholder="请输入相册名称" onChange={(e)=>{e.preventDefault();this.setState({albumname:e.target.value})}}/>
                                                    </Modal>
                                                </Tooltip>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div style={{margin:10,paddingLeft:70,paddingTop:20}}>
                                        <Row style={{width:300}}>
                                            <Col span={12}>
                                        <Button
                                        type="primary"
                                        icon="share-alt"
                                        size={size}
                                        loading={this.state.uploadiconLoading_share}
                                        onClick={this.uploadIconLoading_share.bind(this)}>Upload</Button>
                                            </Col>
                                            <Col span={12}>
                                        <Button
                                            type="danger"
                                            icon="pushpin-o"
                                            size={size}
                                            onClick={this.cancelIconLoading_share}>Cancle</Button>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </TabPane>
                    <TabPane tab={<span><Icon type="picture" />上传相册</span>} key="2">
                        <div  style={{marginLeft:250,width:900}}>
                            <Row>
                                <Col span={12}>
                        <div className="clearfix" style={{width:400,marginTop:20,borderRightWidth:1,borderTopWidth:0,borderLeftWidth:0,borderBottomWidth:0,borderStyle:'dashed',borderColor:'#1088e9'}}>
                            <Upload
                                action="//jsonplaceholder.typicode.com/posts/"
                                listType="picture-card"
                                onPreview={this.handlePreview}
                                onChange={this.handleChange.bind(this)}
                            >
                                {fileList.length >= 9 ? null : uploadButton}
                            </Upload>
                            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                <img alt="example" style={{ width: '100%' }} src={previewImage} />
                            </Modal>
                        </div>
                                </Col>
                                <Col span={12}>
                                    <div style={{width:350,paddingTop:20}}>
                                        <Row style={{paddingTop:5}}>
                                            <Col span={12}>
                                                <div style={{fontSize:'1.2em',paddingLeft:20,}}>上传相册至:</div>
                                            </Col>
                                            <Col span={12}>
                                                <Row>
                                                    <Col span={12}>
                                                        <Select defaultValue={this.state.albumid>0?this.state.albumid:null} style={{ width: 120 }}>
                                                            {RenderAlbums.bind(this)()}
                                                        </Select>
                                                    </Col>
                                                    <Col span={12}>
                                                        <Tooltip placement="top" title={text}>
                                                            <Icon type="plus-circle" style={{fontSize:16,color:'#1088e9',paddingTop:8}} onClick={this.showModal}/>
                                                            <Modal title="新建相册"
                                                                   visible={visible}
                                                                   onOk={this.handleOk}
                                                                   confirmLoading={confirmLoading}
                                                                   onCancel={this.handleModelCancel}
                                                            >
                                                                <Input placeholder="请输入相册名称" />
                                                            </Modal>
                                                        </Tooltip>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div style={{margin:10,paddingLeft:30,paddingTop:20}}>
                                        <Row style={{width:300}}>
                                            <Col span={12}>
                                                <Button
                                                    type="primary"
                                                    icon="share-alt"
                                                    size={size}
                                                    loading={this.state.uploadiconLoading_upload}
                                                    onClick={this.uploadIconLoading_upload}>Upload</Button>
                                            </Col>
                                            <Col span={12}>
                                                <Button
                                                    type="danger"
                                                    icon="pushpin-o"
                                                    size={size}
                                                    onClick={this.cancelIconLoading_upload}>Cancle</Button>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </TabPane>
                </Tabs>
                <Userfoot/>
            </div>
        );
    }
}

export default Share;