/**
 * Created by Administrator on 2017/8/16.
 */
var React = require("react");
import GoodsView from '../pages/goods/GoodsView';
import GoodsCategoryView from '../pages/goodsCategory/GoodsCategoryView';
import OrderView from '../pages/order/OrderView';

import {Layout, Menu, Breadcrumb, Icon} from 'antd';
const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;

import {
    Router,
    Route,
    HashRouter,
    BrowserRouter,
    Link
} from 'react-router-dom';


var MainPage = React.createClass({
    render: function () {
        return (
            <Layout>
                <Header className="header" style={{display: 'none'}}>
                    <div className="logo"/>

                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                        style={{lineHeight: '0'}}
                    >
                        <Menu.Item key="1"><Link to="/main/test">nav 1</Link></Menu.Item>
                        <Menu.Item key="2">nav 2</Menu.Item>
                        <Menu.Item key="3">nav 3</Menu.Item>
                    </Menu>

                </Header>

                <Layout style={{height: 600}}>
                    <Sider width={200} collapsedWidth="50" style={{background: '#fff'}} collapsible="false">
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['5']}
                            defaultOpenKeys={['sub2']}
                            style={{borderRight: 0}}
                        >
                            <SubMenu key="sub1" title={<span><Icon type="home"/>商品</span>}>
                                <Menu.Item key="1"><Link
                                    to={`${this.props.match.url}/goods/query`}>查看</Link></Menu.Item>
                                <Menu.Item key="2"><Link ref="firstLink" to={`${this.props.match.url}/goods/add`}>添加</Link></Menu.Item>
                                <Menu.Item key="3"><Link to={`${this.props.match.url}/goods/delete`}>删除</Link></Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" title={<span><Icon type="laptop"/>商品分类</span>}>
                                <Menu.Item key="5"><Link
                                    to={`${this.props.match.url}/goodsCategory/query`}>查看</Link></Menu.Item>
                                <Menu.Item key="6"><Link
                                    to={`${this.props.match.url}/goodsCategory/add`}>添加</Link></Menu.Item>
                                <Menu.Item key="7"><Link
                                    to={`${this.props.match.url}/goodsCategory/delete`}>删除</Link></Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub3" title={<span><Icon type="notification"/>订单</span>}>
                                <Menu.Item key="9"><Link
                                    to={`${this.props.match.url}/order/query`}>查看</Link></Menu.Item>
                                <Menu.Item key="10"><Link to={`${this.props.match.url}/order/add`}>添加</Link></Menu.Item>
                                <Menu.Item key="11"><Link
                                    to={`${this.props.match.url}/order/delete`}>删除</Link></Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>

                    <Layout style={{padding: '0 24px 24px'}}>
                        <Breadcrumb style={{margin: '0 0', display: 'none'}}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb>
                        <Content style={{background: '#F6FAFE', padding: 0, margin: 0, height: '100%'}}>
                            <Route path={`${this.props.match.url}/goods/:action`} component={GoodsView}/>
                            <Route path={`${this.props.match.url}/goodsCategory/:action`}
                                   component={GoodsCategoryView}/>
                            <Route path={`${this.props.match.url}/order/:action`} component={OrderView}/>
                        </Content>
                    </Layout>

                </Layout>
            </Layout>
        );
    },

    componentDidMount: function () {
        this.props.history.push(this.props.match.url + "/goods/query");
    }
   });



export default MainPage;
