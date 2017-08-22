/**
 * Created by FSX on 6/03/2017.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import LoginView from '../pages/LoginView';
import { Provider } from 'react-redux';
import store from '../store/index';
import MainView from '../pages/main';


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


var Register = React.createClass({

    render: function () {
        return (<div>我是注册</div>);
    }
});

const Hot=({match})=>(<div style={{display:'flex', flexDirection:"column"}}>
<div style={{display:"inline"}}>
    <h2>热门</h2>
    <Link to={`${match.url}/article`}>文章</Link>
    <Link to={`${match.url}/qa`}>问答</Link>
    <Link to={`${match.url}/news`}>新闻</Link>
    <hr/>
    </div>
    <div>
    <Route path={`${match.url}/:type`} component={Content}/>
        </div>
</div>);


var AppRouter = React.createClass({

    render: function () {
        return (
            <BrowserRouter>
                <div style={ {display:'flex', flexDirection : "column", flex:1}}>
                    <Navbar style={{marginTop: 2}}>
                        <Navbar.Header>
                            <Navbar.Brand>
                                <a href="/">金凤针织商品管理</a>
                            </Navbar.Brand>
                        </Navbar.Header>
                    </Navbar>
                    <center>
                        <Route exact path="/" component={LoginView}/>
                        <Route path="/main" component={MainView} />
                        <Route exact path="/login" component={LoginView}/>
                        <Route exact path="/register" component={Register}/>
                    </center>
                </div>
            </BrowserRouter>

        );
    }

});

var App = React.createClass({
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