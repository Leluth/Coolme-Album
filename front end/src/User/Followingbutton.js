import React, { Component } from 'react';

import { Button, } from 'antd';


class Followingbutton extends Component {
    state = {
        type: 'primary',
        value:"已关注"
    };
    typeChange = (e) => {
        if (this.state.type=="primary") {
            this.setState({ type: 'danger',
                value:"未关注"});}
        else if (this.state.type=="danger") {
            this.setState({ type: 'primary',
                value:"已关注"});
            }
    }
    render() {
        const type = this.state.type;
        const value = this.state.value;
        return (
            <div>
                <Button type={type} size="default" onClick={this.typeChange}>{value}</Button>
            </div>
        );
    }
}

export default Followingbutton;