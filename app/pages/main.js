/**
 * Created by Administrator on 2017/8/16.
 */
var React = require("react");
import GoodsView from '../pages/goods/GoodsView';
import GoodsCategoryView from '../pages/goodsCategory/GoodsCategoryView';
import OrderView from '../pages/order/OrderView';

import {Layout, Menu, Breadcrumb, Icon} from 'antd';
const {SubMenu} = Menu;
const {Header, Content, Sider, Footer} = Layout;

import {
    Router,
    Route,
    HashRouter,
    BrowserRouter,
    Link
} from 'react-router-dom';
import * as Urls from "../constant/Urls";

const ROUTER_PREFIX = Urls.ROUTER_PREFIX;
const menu_style = {
    background: "#333333", color: "#fff"
};

const left_menu_style = {
    background: "#333333", color: "#fff"
}
class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: '1',
            openKeys: ['sub1'],
            collapsed: false
        }
        this.onCollapse = (collapsed) => {
            console.log(collapsed);
            this.setState({collapsed});
        }
    }

    handleClick(e) {
        console.log('Clicked: ', e);
        this.setState({current: e.key});
    }

    onOpenChange(openKeys) {
        const state = this.state;
        const latestOpenKey = openKeys.find(key => !(state.openKeys.indexOf(key) > -1));
        const latestCloseKey = state.openKeys.find(key => !(openKeys.indexOf(key) > -1));

        let nextOpenKeys = [];
        if (latestOpenKey) {
            nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
        }
        if (latestCloseKey) {
            nextOpenKeys = this.getAncestorKeys(latestCloseKey);
        }
        this.setState({openKeys: nextOpenKeys});
    }

    getAncestorKeys(key) {
        const map = {
            sub3: ['sub2'],
        };
        return map[key] || [];
    }

    render() {
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
                    </Menu>

                </Header>

                <Layout style={{height: "100%", minHeight: '550px'}}>
                    <Sider width={200}
                           collapsed={this.state.collapsed}
                           onCollapse={this.onCollapse}
                           collapsible="false">
                        <Menu
                            mode="inline"
                            theme="dark"
                            openKeys={this.state.openKeys}
                            selectedKeys={[this.state.current]}
                            onOpenChange={this.onOpenChange.bind(this)}
                            onClick={this.handleClick.bind(this)}
                            inlineCollapsed={this.state.collapsed}
                        >
                            <SubMenu key="sub1"
                                     title={<span><Icon type="gift"/><span>商品</span></span>}>
                                <Menu.Item key="1"><Link
                                    to={`${this.props.match.url}/goods/query`}>查看</Link></Menu.Item>
                                <Menu.Item key="2"><Link ref="firstLink"
                                                         to={`${this.props.match.url}/goods/add`}>添加</Link></Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" title={<span><Icon type="switcher"/><span>商品分类</span></span>}>
                                <Menu.Item key="5"><Link
                                    to={`${this.props.match.url}/goodsCategory/query`}>查看</Link></Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub4" title={<span><Icon type="shop"/><span>订单</span></span>}>
                                <Menu.Item key="9"><Link
                                    to={`${this.props.match.url}/order/query`}>查看</Link></Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>

                    <Layout style={{padding: '0 24px 24px'}}>
                        <Content style={{background: '#F6FAFE', padding: 10, margin: 0, height: '100%', marginTop: 10}}>
                            <Route path={`${this.props.match.url}/goods/:action`} component={GoodsView}/>
                            <Route path={`${this.props.match.url}/goodsCategory/:action`}
                                   component={GoodsCategoryView}/>
                            <Route path={`${this.props.match.url}/order/:action`} component={OrderView}/>
                        </Content>
                        <Footer style={{textAlign: 'center'}}>
                        </Footer>
                    </Layout>

                </Layout>
            </Layout>
        );
    }

}


export default MainPage;
