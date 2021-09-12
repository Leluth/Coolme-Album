import React, { Component } from 'react';

import 'antd/dist/antd.css';

import Headerdemo from '../Headerdemo/Headerdemo';
import Userfoot from '../User/Userfoot';


class User extends Component {
    render() {
        return (
            <div>
                <Headerdemo/>
                <Userfoot/>
            </div>
        );
    }
}

export default User;