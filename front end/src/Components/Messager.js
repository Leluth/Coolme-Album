import React from 'react'
import {Avatar} from 'antd'
import notification from 'antd/lib/notification'
import 'antd/lib/notification/style/css'

// import AlbumIcon from '%PUBLIC_URL%/AlbumIcon.png'

notification.config({
    duration: 2.5,
    // todo
});

export function tips(msg, icon, description) {
    return notification.open({
        classname: 'antd/lib/notification/style/css',
        icon: icon,
        message: msg,
        description: description
    })
}

export class Messager extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            api: 'http://localhost:8080/user/messages',
            interval: 5000,
            messages: null,
        };
        this.get.bind(this);
        this.show.bind(this);
    }

    componentDidMount() {
        this.timer=setInterval(()=> this.get(),this.state.interval);
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }

    componentDidUpdate() {
        this.show()
    }

    get() {
        fetch(this.state.api, {
            credentials: "include"
        })
            .then(response => response.json())
            .then((responseJson) => {
                this.setState({
                    messages: responseJson
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }


    show() {
        if (this.state.messages != null && this.state.messages.length !== 0) {
            for (let message of this.state.messages) {
                let user = message.user;
                let msg=(message.type===1)?(user.username+' follows you!'):'';
                msg=(message.type===4)?(user.username+' 分享了新照片!'):'';
                tips('A Message!',
                    <Avatar src={'http://localhost:8080/images/' + this.state.messages[0].user.avatar}/>,
                    msg)
            }
        }
    }


    render() {
        return(
            <div></div>
        )
    }
}