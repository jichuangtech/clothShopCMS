/**
 * Created by FSX on 6/03/2017.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import LoginView from './LoginView';


import {
    Button
} from 'antd';

import {
    Router,
    Route,
    HashRouter,
    hashHistory,
    Link
} from 'react-router-dom';


class MainView extends React.Component {

    constructor(props) {
        super(props);
    }

    render(){
        return (<div><h1>我是主界面</h1></div>);

    }
}

export default MainView;