/**
 * Created by FSX on 6/03/2017.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import LoginView from '../login/LoginView';

import {
    Button
} from 'antd';

import {Navbar} from "react-bootstrap";

var App = React.createClass({

    render: function() {

        return (
            <div>
                <LoginView/>
                <h1>Hey,this is a React and Antd IDE1233111</h1>
                <div className="Antd">
                    <Button type="primary" size="large">成功加载Antd组件</Button>
                </div>
                <Navbar style={{marginTop: 20}}>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#">react-bootstrap</a>
                        </Navbar.Brand>
                    </Navbar.Header>
                </Navbar>
            </div>
        )
    }
});

ReactDOM.render(
    <App/>,
    document.getElementById('app')
);