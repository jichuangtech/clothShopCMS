/**
 * Created by FSX on 6/03/2017.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import LoginView from '../view/LoginView';
import MainView from '../view/main';


import {
    Button
} from 'antd';

import {
    Router,
    Route,
    HashRouter,
    hashHistory,
    Link,
} from 'react-router-dom';

import {Navbar} from "react-bootstrap";


var Register = React.createClass({

    render :function () {
        return (<div>我是注册</div>);
    }
});

var AppRouter = React.createClass({

    render: function () {
        return (
            <HashRouter history={hashHistory}>
                <div>
                    <Navbar style={{marginTop: 2}}>
                        <Navbar.Header>
                            <Navbar.Brand>
                                <a href="/#">金凤针织商品管理</a>
                            </Navbar.Brand>
                        </Navbar.Header>
                    </Navbar>
                    <center>
                        <Route exact path="/" component={LoginView} />
                        <Route exact path="/login" component={LoginView} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/main" component={MainView} />
                    </center>
                </div>
            </HashRouter>

        );
    }

});


ReactDOM.render(
    <AppRouter/>,
    document.getElementById('app')
);