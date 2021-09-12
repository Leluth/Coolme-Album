import React from 'react'

import {Modal, Card} from 'antd'


const avatarPrepath='http://localhost:8080/images/';

export const EleModal=(data,eleClick)=>{
    if(data!=null) {
        return (
            <Modal visible={true}
                   footer={null}
                   onCancel={()=>eleClick(-1)}
                   width='75%'
            >
                <Card cover={<img src={avatarPrepath + data.ele.source}/>}
                      hoverable={true}
                >
                    <Card.Meta description={data.ele.description}/>
                </Card>
            </Modal>
        )
    }
};
