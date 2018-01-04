/**
 * Created by FSX on 6/03/2017.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import LoginView from '../pages/LoginView';
import {Provider} from 'react-redux';
import {Modal, Button, message, Input, Row, Col, Radio, Checkbox, Dropdown, Menu, Icon} from 'antd';
import store from '../store/index';
import MainView from '../pages/main';
import '../style/main.css';
import GoodsCategoryView from '../pages/goodsCategory/GoodsCategoryView';

import {
    Router,
    Route,
    HashRouter,
    hashHistory,
    BrowserRouter,
    Switch,
    Link
} from 'react-router-dom';

import {Navbar} from "react-bootstrap";
import * as Urls from "../constant/Urls";

const ROUTER_PREFIX = Urls.ROUTER_PREFIX;
const Register = React.createClass({

    render: function () {
        return (<div>我是注册</div>);
    }
});

const AppRouter = React.createClass({
    render: function () {
        const menu = (
            <Menu>
                <Menu.Item key="1">个人信息</Menu.Item>
                <Menu.Item key="2">退出</Menu.Item>
            </Menu>
        );
        return (
            <BrowserRouter basename={ROUTER_PREFIX}>
                <div style={{display: 'flex', flexDirection: "column", flex: 1}}>
                    <Navbar style={{backgroundColor: "#222222", height: "45px"}}>
                        <Navbar.Header>
                            <Navbar.Brand>
                                <Col span={4}><a href={ROUTER_PREFIX + "/"} style={{
                                    color: "#fff",
                                    margin: "10px",
                                    lineHeight: "44px",
                                    fontSize: "16px"
                                }}>金凤针织商品管理</a></Col>
                                <Col span={16}/>
                                <Col span={1}>
                                    <Dropdown overlay={menu}>
                                        <div className="menu_div"
                                             style={{
                                                 height: "45px",
                                                 width: "100%",
                                                 textAlign: "center",
                                                 paddingTop: "10px"
                                             }}>
                                            <span className="ant-dropdown-link"
                                                  style={{fontSize: "16px", color: "#fff"}}>
                                                黄彬 <Icon type="down"/>
                                            </span>
                                        </div>
                                    </Dropdown>
                                </Col>
                            </Navbar.Brand>
                        </Navbar.Header>
                    </Navbar>
                    <center>
                        <Route exact path="/" component={LoginView}/>
                        <Route path="/main" component={MainView}/>
                        <Route exact path="/login" component={LoginView}/>
                        <Route exact path="/register" component={Register}/>
                    </center>
                </div>
            </BrowserRouter>

        );
    }

});

const App = React.createClass({
    render: function () {
        return (
            <Provider store={store}>
                <AppRouter/>
            </Provider>
        );
    }

});

ReactDOM.render(
    <App/>,
    document.getElementById('app')
);