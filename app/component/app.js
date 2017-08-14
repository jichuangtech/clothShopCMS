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
            <div className="ds">
                <Navbar style={{marginTop: 2}}>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#">金凤针织商品管理</a>
                        </Navbar.Brand>
                    </Navbar.Header>
                </Navbar>
                <LoginView />
            </div>
        )
    }
});

ReactDOM.render(
    <App/>,
    document.getElementById('app')
);